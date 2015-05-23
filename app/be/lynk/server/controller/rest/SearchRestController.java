package be.lynk.server.controller.rest;

import be.lynk.server.dto.BusinessDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.List;

/**
 * Created by florian on 23/05/15.
 */
@org.springframework.stereotype.Controller
public class SearchRestController extends AbstractRestController {


    @Autowired
    private BusinessService businessService;

    @Transactional
    public Result getByPromotion() {

        List<Business> all = businessService.findAll();

        List<BusinessDTO> map = dozerService.map(all, BusinessDTO.class);

        return ok(new ListDTO<BusinessDTO>(map));

    }
}
