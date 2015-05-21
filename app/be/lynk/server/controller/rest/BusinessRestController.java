package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.BusinessCategoryDTO;
import be.lynk.server.dto.BusinessDTO;
import be.lynk.server.dto.CustomerInterestDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.BusinessCategoryService;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.CustomerInterestService;
import be.lynk.server.service.DozerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Transactional
    public Result getAllBusinessCategory() {

        List<BusinessCategory> all = businessCategoryService.findAllParent();

        return ok(new ListDTO<BusinessCategoryDTO>(dozerService.map(all, BusinessCategoryDTO.class)));
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
        business.setBusinessCategories(new HashSet<>());
        for (BusinessCategoryDTO businessCategoryDTO : dto.getBusinessCategories()) {
            business.getBusinessCategories().add(businessCategoryService.findByName(businessCategoryDTO.getName()));
        }

        businessService.saveOrUpdate(business);

        return ok(new ListDTO<>(dozerService.map(business.getBusinessCategories(), BusinessCategoryDTO.class)));

    }

}
