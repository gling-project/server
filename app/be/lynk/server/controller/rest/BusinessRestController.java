package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.AbstractController;
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

import java.util.*;

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
    private PublicationService publicationService;

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
        BusinessForDisplayDTO map = dozerService.map(business, BusinessForDisplayDTO.class);


        //load last publication
        publicationService.findLastPublication(business);

        return ok(map);
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result editIllustration() {
        StoredFileDTO dto = extractDTOFromRequest(StoredFileDTO.class);

        StoredFile storedFile = storedFileService.findById(dto.getId());

        if (!storedFile.getIsImage() ||
                !storedFile.getAccount().equals(securityController.getCurrentUser())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        BusinessAccount businessAccount = (BusinessAccount) securityController.getCurrentUser();
        Business business = businessAccount.getBusiness();
        business.setIllustration(storedFile);

        return ok(new ResultDTO());
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
    public Result update() {
        BusinessDTO dto = extractDTOFromRequest(BusinessDTO.class);


        BusinessAccount currentUser = (BusinessAccount) securityController.getCurrentUser();

        Business business = currentUser.getBusiness();

        business.setName(dto.getName());
        business.setDescription(dto.getDescription());
        business.setPhone(dto.getPhone());

        businessService.saveOrUpdate(business);

        return ok(dozerService.map(business, BusinessDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result editBusinessCategory() {
        BusinessDTO dto = extractDTOFromRequest(BusinessDTO.class);


        BusinessAccount currentUser = (BusinessAccount) securityController.getCurrentUser();

        Business business = currentUser.getBusiness();
        //add categories
        business.setBusinessCategories(new ArrayList<>());
        for (BusinessCategoryDTO businessCategoryDTO : dto.getBusinessCategories()) {
            business.getBusinessCategories().add(businessCategoryService.findByName(businessCategoryDTO.getName()));
        }

        businessService.saveOrUpdate(business);

        return ok(new ListDTO<>(dozerService.map(business.getBusinessCategories(), BusinessCategoryDTO.class)));

    }

}
