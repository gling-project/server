package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.dto.CustomerInterestDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.service.CustomerInterestService;
import be.lynk.server.service.DozerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.Collections;
import java.util.List;

/**
 * Created by florian on 23/03/15.
 */
@Controller
public class CustomerRestController extends AbstractController {

    @Autowired
    private DozerService dozerService;

    @Autowired
    private CustomerInterestService customerInterestService;

    @Transactional
    public Result getAllCustomerInterest(){

        List<CustomerInterest> all = customerInterestService.findAll();

        Collections.sort(all);

        return ok(new ListDTO<CustomerInterestDTO>(dozerService.map(all, CustomerInterestDTO.class)));
    }

}
