package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusAnnotation;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.*;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by florian on 23/03/15.
 */
@Controller
public class BusinessRestController extends AbstractController {

    @Autowired
    private DozerService dozerService;
    @Autowired
    private BusinessCategoryService businessCategoryService;
    @Autowired
    private BusinessService businessService;
    @Autowired
    private StoredFileService storedFileService;
    @Autowired
    private FollowLinkService followLinkService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private LocalizationService localizationService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result getFollowed() {

        List<FollowLink> followLinks = followLinkService.findByAccount(securityController.getCurrentUser());

        List<Business> businesses = followLinks
                .stream().map(s -> s.getBusiness())
                .sorted()
                .collect(Collectors.toList());

        return ok(convertBusiness(businesses));
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result getAll() {
        List<Business> all = businessService.findAll();

        List<BusinessDTO> map = dozerService.map(all, BusinessDTO.class);

        return ok(new ListDTO<>(map));
    }


    /**
     * return only public data for all users / non-users
     *
     * @param id
     * @return
     */
    @Transactional
    public Result getPublicData(long id) {


        Business business = businessService.findById(id);

        //convert
        BusinessToDisplayDTO businessToDisplayDTO = convertBusiness(business);

        return ok(businessToDisplayDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.NOT_PUBLISHED, BusinessStatus.PUBLISHED})
    public Result editGallery() {
        List<StoredFileDTO> galleryPictures = extractList(StoredFileDTO.class);

        Business business = securityController.getBusiness();

        List<StoredFile> map = dozerService.map(galleryPictures, StoredFile.class);

        for (StoredFile storedFile : business.getGalleryPictures()) {
            storedFile.setBusinessGalleryPicture(null);
        }

        business.getGalleryPictures().clear();

        Set<StoredFile> f = new HashSet<>();

        int order = 0;

        for (StoredFile storedFile : map) {

            StoredFile byStoredName = storedFileService.findByStoredName(storedFile.getStoredName());

            byStoredName.setBusinessGalleryPicture(business);

            byStoredName.setComment(storedFile.getComment());

            byStoredName.setFileOrder(++order);

            f.add(byStoredName);

            business.getGalleryPictures().add(byStoredName);
        }

//        business.setGalleryPictures(f);

        businessService.saveOrUpdate(business);

        return ok(new ListDTO(dozerService.map(business.getGalleryPictures(), StoredFileDTO.class)));
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.NOT_PUBLISHED})
    public Result editAddress() {

        //test id
        Account currentUser = securityController.getCurrentUser();

        AddressDTO dto = extractDTOFromRequest(AddressDTO.class);

        Address address = ((BusinessAccount) currentUser).getBusiness().getAddress();
        address.setCity(dto.getCity());
        address.setStreet(dto.getStreet());
        address.setName(dto.getName());
        address.setZip(dto.getZip());


        //control address
        try {
            localizationService.validAddress(address);
        } catch (Exception e) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS);
        }

        addressService.saveOrUpdate(address);

        AddressDTO addressDTO = dozerService.map(address, AddressDTO.class);

        return ok(addressDTO);
    }

    @Transactional
    public Result getAllBusinessCategory() {

        List<BusinessCategory> all = businessCategoryService.findAllParent();

        Collections.sort(all);

        List<BusinessCategoryDTO> map = dozerService.map(all, BusinessCategoryDTO.class);

        Collections.sort(map);

        for (BusinessCategoryDTO businessCategoryDTO : map) {
            Collections.sort(businessCategoryDTO.getChildren());

            for (BusinessCategoryDTO categoryDTO : businessCategoryDTO.getChildren()) {
                Collections.sort(categoryDTO.getChildren());
            }

        }


        return ok(new ListDTO<>(map));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.NOT_PUBLISHED, BusinessStatus.PUBLISHED})
    public Result askPublication() {
        Business business = ((BusinessAccount) securityController.getCurrentUser()).getBusiness();

        business.setBusinessStatus(BusinessStatus.WAITING_CONFIRMATION);
        business.setAskPublicationDate(LocalDateTime.now());

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.WAITING_CONFIRMATION})
    public Result cancelPublicationRequest() {
        Business business = ((BusinessAccount) securityController.getCurrentUser()).getBusiness();

        business.setBusinessStatus(BusinessStatus.NOT_PUBLISHED);
        business.setAskPublicationDate(LocalDateTime.now());

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.PUBLISHED})
    public Result stopPublication() {
        Business business = ((BusinessAccount) securityController.getCurrentUser()).getBusiness();

        business.setBusinessStatus(BusinessStatus.NOT_PUBLISHED);
        business.setAskPublicationDate(LocalDateTime.now());

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.NOT_PUBLISHED, BusinessStatus.PUBLISHED})
    public Result editIllustration() {
        StoredFileDTO dto = extractDTOFromRequest(StoredFileDTO.class);

        StoredFile storedFile = storedFileService.findById(dto.getId());

        if ((storedFile.getIsImage() != null && !storedFile.getIsImage()) ||
                !storedFile.getAccount().equals(securityController.getCurrentUser())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        BusinessAccount businessAccount = (BusinessAccount) securityController.getCurrentUser();
        Business business = businessAccount.getBusiness();
        business.setIllustration(storedFile);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.NOT_PUBLISHED, BusinessStatus.PUBLISHED})
    public Result editLandscape() {
        StoredFileDTO dto = extractDTOFromRequest(StoredFileDTO.class);

        StoredFile storedFile = storedFileService.findById(dto.getId());

        if ((storedFile.getIsImage() != null && !storedFile.getIsImage()) ||
                !storedFile.getAccount().equals(securityController.getCurrentUser())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        BusinessAccount businessAccount = (BusinessAccount) securityController.getCurrentUser();
        Business business = businessAccount.getBusiness();
        business.setLandscape(storedFile);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.NOT_PUBLISHED})
    public Result update() {
        BusinessDTO dto = extractDTOFromRequest(BusinessDTO.class);


        BusinessAccount currentUser = (BusinessAccount) securityController.getCurrentUser();

        Business business = currentUser.getBusiness();

        business.setName(dto.getName());
        business.setDescription(dto.getDescription());
        business.setPhone(dto.getPhone());
        business.setEmail(dto.getEmail());
        business.setWebsite(dto.getWebsite());

        businessService.saveOrUpdate(business);

        return ok(dozerService.map(business, BusinessDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result updateSocialNetwork() {

        BusinessSocialNetworkDTO dto = extractDTOFromRequest(BusinessSocialNetworkDTO.class);


        BusinessAccount currentUser = (BusinessAccount) securityController.getCurrentUser();

        Business business = currentUser.getBusiness();

        business.setSocialNetwork(dozerService.map(dto, BusinessSocialNetwork.class));

        businessService.saveOrUpdate(business);

        return ok(dozerService.map(business, BusinessDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.NOT_PUBLISHED})
    public Result editBusinessCategory() {

        List<BusinessCategoryDTO> list = extractList(BusinessCategoryDTO.class);
        //BusinessDTO dto = extractDTOFromRequest(BusinessDTO.class);


        BusinessAccount currentUser = (BusinessAccount) securityController.getCurrentUser();

        Business business = currentUser.getBusiness();
        //add categories
        business.setBusinessCategories(new ArrayList<>());
        for (BusinessCategoryDTO businessCategoryDTO : list) {
            business.getBusinessCategories().add(businessCategoryService.findByName(businessCategoryDTO.getName()));
        }

        businessService.saveOrUpdate(business);

        return ok(dozerService.map(business, BusinessCategoryLittleContainerDTO.class));

    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result getInterests() {

        List<CustomerInterest> result = new ArrayList<>();

        Business business = securityController.getBusiness();

        for (BusinessCategory businessCategory : business.getBusinessCategories()) {
            for (CategoryInterestLink categoryInterestLink : businessCategory.getLinks()) {
                result.add(categoryInterestLink.getCustomerInterest());
            }
        }

        return ok(new ListDTO<>(dozerService.map(result, CustomerInterestDTO.class)));
    }

    private ListDTO<BusinessToDisplayDTO> convertBusiness(List<Business> businesses) {
        return new ListDTO<>(businesses.stream()
                .map(b -> convertBusiness(b))
                .collect(Collectors.toList()));
    }

    private BusinessToDisplayDTO convertBusiness(Business business) {

        BusinessToDisplayDTO businessToDisplayDTO = dozerService.map(business, BusinessToDisplayDTO.class);

        //additional data
        if (securityController.isAuthenticated(ctx())) {
            businessToDisplayDTO.setFollowing(followLinkService.testByAccountAndBusiness(securityController.getCurrentUser(), business));
        }
        businessToDisplayDTO.setTotalFollowers(followLinkService.countByBusiness(business));

        //order gallery
        Collections.sort(businessToDisplayDTO.getGalleryPictures());

        return businessToDisplayDTO;
    }

}
