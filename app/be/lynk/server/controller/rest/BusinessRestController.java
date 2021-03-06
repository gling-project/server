package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusAnnotation;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.*;
import be.lynk.server.util.exception.RegularErrorException;
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
    private DozerService            dozerService;
    @Autowired
    private BusinessCategoryService businessCategoryService;
    @Autowired
    private BusinessService         businessService;
    @Autowired
    private StoredFileService       storedFileService;
    @Autowired
    private AddressService          addressService;
    @Autowired
    private LocalizationService     localizationService;
    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private AccountService          accountService;
    @Autowired
    private ClaimBusinessService    claimBusinessService;

    /* ////////////////////////////////////////////////////
     * READ FUNCTION
     /////////////////////////////////////////////////// */

    @Transactional
    public Result lastBusinesses(int nb) {

        PositionDTO positionDTO = initialization(PositionDTO.class);
        Position position = dozerService.map(positionDTO, Position.class);

        List<Business> businesses = businessService.findLastPublished(nb);
        List<BusinessToDisplayDTO> businessesDtos = new ArrayList<>();

        for (Business business : businesses) {
            BusinessToDisplayDTO map = dozerService.map(business, BusinessToDisplayDTO.class);
            map.setDistance(localizationService.distanceBetweenAddress(position, business.getAddress()));
            businessesDtos.add(map);
        }

        return ok(new ListDTO<>(businessesDtos));
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result getFollowed() {

        List<Business> businesses = businessService.findByFollowed(securityController.getCurrentUser());

        return ok(convertBusiness(businesses));
    }


    /**
     * return only public data for all users / non-users
     *
     * @param id
     * @return
     */
    @Transactional
    public Result getPublicData(long id) {

        Account currentUser = null;
        if (securityController.isAuthenticated(ctx())) {
            currentUser = securityController.getCurrentUser();
        }

        Business business = businessService.findById(id);

        if (!business.getBusinessStatus().equals(BusinessStatusEnum.PUBLISHED) &&
                (securityController.isAuthenticated(ctx()) == false ||
                        (!currentUser.getRole().equals(RoleEnum.SUPERADMIN) &&
                                (!currentUser.getRole().equals(RoleEnum.BUSINESS) || !business.equals(securityController.getBusiness()))))) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_BUSINESS_HIDDEN_AND_NOT_MINE);
        }

        //convert
        BusinessToDisplayDTO businessToDisplayDTO = convertBusiness(business);

        return ok(businessToDisplayDTO);
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
    public Result getInterests() {

        return ok(new ListDTO<>(dozerService.map(customerInterestService.findAll(), CustomerInterestDTO.class)));
    }

    /* ////////////////////////////////////////////////////
     * CREATE FUNCTION
     /////////////////////////////////////////////////// */




    /* ////////////////////////////////////////////////////
     * EDIT FUNCTION
     /////////////////////////////////////////////////// */

    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @Transactional
    public Result facebookPageAccess() {
        /*
        List<FacebookPageAccessDTO> facebookPageAccessDTOs = initializationList(FacebookPageAccessDTO.class);

        //control facebook page
        Business business = securityController.getBusiness();

        if(business.getSocialNetwork()==null || business.getSocialNetwork().getFacebookLink()==null){
            throw new RegularErrorException(ErrorMessageEnum.ERROR_BUSINESS_FACEBOOK_ACCESS_NO_FACEBOOK_PAGE);
        }

        //find facebook page
        String facebookLink = business.getSocialNetwork().getFacebookLink();
*/

        return ok();
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result claimBusiness() {

        ClaimBusinessDTO claimBusinessDTO = initialization(ClaimBusinessDTO.class);

        if (securityController.getCurrentUser().getBusiness() != null) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_BUSINESS_CLAIM_ALREADY_HAVE_BUSINESS);
        }

        ClaimBusiness claimBusiness = claimBusinessService.findByAccount(securityController.getCurrentUser());

        if (claimBusiness != null) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_BUSINESS_CLAIM_ALREADY_HAVE_CLAIMS, claimBusiness.getBusiness().getName());
        }

        //create claim request
        claimBusiness = dozerService.map(claimBusinessDTO, ClaimBusiness.class);

        claimBusiness.setBusiness(businessService.findById(claimBusinessDTO.getBusinessId()));
        claimBusiness.setAccount(securityController.getCurrentUser());

        claimBusinessService.saveOrUpdate(claimBusiness);

        return ok();
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result editGallery(long businessId) {
        List<StoredFileDTO> galleryPictures = initializationList(StoredFileDTO.class);

        //control business
        Business business = businessService.findById(businessId);

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }

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
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.NOT_PUBLISHED, BusinessStatusEnum.WAITING_CONFIRMATION})
    public Result editAddress(long businessId) {

        //control business
        Business business = businessService.findById(businessId);

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }


        //test id
        Account currentUser = securityController.getCurrentUser();

        AddressDTO dto = initialization(AddressDTO.class);

        Address address = business.getAddress();
        if (address == null) {
            address = new Address();
            business.setAddress(address);
            //TODO temp
            address.setCountry("BELGIUM");
        }
        address.setCity(dto.getCity());
        address.setStreet(dto.getStreet());
        address.setName(dto.getName());
        address.setZip(dto.getZip());


        //control address
        try {
            localizationService.validAddress(address);
        } catch (Exception e) {
            throw new RegularErrorException(ErrorMessageEnum.WRONG_ADDRESS);
        }

        addressService.saveOrUpdate(address);

        AddressDTO addressDTO = dozerService.map(address, AddressDTO.class);

        return ok(addressDTO);
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result editIllustration(long businessId) {

        //control business
        Business business = businessService.findById(businessId);

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }


        StoredFileDTO dto = initialization(StoredFileDTO.class);

        StoredFile storedFile = storedFileService.findById(dto.getId());

        if (!storedFile.getAccount().equals(securityController.getCurrentUser())) {
            if (securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN)) {
                storedFile.setAccount(securityController.getBusiness().getAccount());
            } else {
                throw new RegularErrorException(ErrorMessageEnum.WRONG_AUTHORIZATION);
            }
        }


        business.setIllustration(storedFile);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result editLandscape(long businessId) {
        StoredFileDTO dto = initialization(StoredFileDTO.class);

        StoredFile storedFile = storedFileService.findById(dto.getId());

        if (!storedFile.getAccount().equals(securityController.getCurrentUser())) {
            if (securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN)) {
                storedFile.setAccount(securityController.getBusiness().getAccount());
            } else {
                throw new RegularErrorException(ErrorMessageEnum.WRONG_AUTHORIZATION);
            }
        }

        //control business
        Business business = businessService.findById(businessId);

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }

        business.setLandscape(storedFile);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result update(long businessId) {
        BusinessDTO dto = initialization(BusinessDTO.class);

        //control business
        Business business = businessService.findById(businessId);

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }

        if (!business.getBusinessStatus().equals(BusinessStatusEnum.PUBLISHED)) {
            business.setName(dto.getName());
            business.setVta(dto.getVta());
        }
        business.setDescription(dto.getDescription());
        business.setPhone(dto.getPhone());
        business.setEmail(dto.getEmail().toLowerCase());
        business.setWebsite(dto.getWebsite());

        businessService.saveOrUpdate(business);

        return ok(dozerService.map(business, BusinessDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result updateSocialNetwork(long businessId) {

        BusinessSocialNetworkDTO dto = initialization(BusinessSocialNetworkDTO.class);

        //control business
        Business business = businessService.findById(businessId);

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }

        business.setSocialNetwork(dozerService.map(dto, BusinessSocialNetwork.class));

        businessService.saveOrUpdate(business);

        return ok(dozerService.map(business, BusinessDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.NOT_PUBLISHED})
    public Result editBusinessCategory(long businessId) {

        List<BusinessCategoryDTO> list = initializationList(BusinessCategoryDTO.class);

        //control business
        Business business = businessService.findById(businessId);

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new RegularErrorException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }

        //add categories
        business.setBusinessCategories(new ArrayList<>());
        for (BusinessCategoryDTO businessCategoryDTO : list) {
            business.getBusinessCategories().add(businessCategoryService.findByName(businessCategoryDTO.getName()));
        }

        businessService.saveOrUpdate(business);

        return ok(dozerService.map(business, BusinessCategoryLittleContainerDTO.class));

    }


    /* ////////////////////////////////////////////////////
     * CHANGE STATUS
     /////////////////////////////////////////////////// */


    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.NOT_PUBLISHED, BusinessStatusEnum.PUBLISHED})
    public Result askPublication() {

        initialization();

        Business business = securityController.getCurrentUser().getBusiness();

        business.setBusinessStatus(BusinessStatusEnum.WAITING_CONFIRMATION);
        business.setAskPublicationDate(LocalDateTime.now());

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.WAITING_CONFIRMATION})
    public Result cancelPublicationRequest() {

        initialization();

        Business business = securityController.getCurrentUser().getBusiness();

        business.setBusinessStatus(BusinessStatusEnum.NOT_PUBLISHED);
        business.setAskPublicationDate(LocalDateTime.now());

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.PUBLISHED})
    public Result stopPublication() {

        initialization();

        Business business = securityController.getCurrentUser().getBusiness();

        business.setBusinessStatus(BusinessStatusEnum.NOT_PUBLISHED);
        business.setAskPublicationDate(LocalDateTime.now());

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }


    private ListDTO<BusinessToDisplayDTO> convertBusiness(List<Business> businesses) {
        return new ListDTO<>(businesses.stream()
                .map(b -> convertBusiness(b))
                .collect(Collectors.toList()));
    }

}
