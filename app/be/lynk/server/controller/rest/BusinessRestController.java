package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.dto.BusinessCategoryDTO;
import be.lynk.server.dto.CustomerInterestDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.service.BusinessCategoryService;
import be.lynk.server.service.CustomerInterestService;
import be.lynk.server.service.DozerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.List;

/**
 * Created by florian on 23/03/15.
 */
@Controller
public class BusinessRestController extends AbstractController {

    @Autowired
    private DozerService dozerService;

    @Autowired
    private BusinessCategoryService businessCategoryService;

    @Transactional
    public Result getAllBusinessCategory(){

        List<BusinessCategory> all = businessCategoryService.findAllParent();

        return ok(new ListDTO<BusinessCategoryDTO>(dozerService.map(all, BusinessCategoryDTO.class)));
    }

}
