package be.lynk.server.controller.rest;

import be.lynk.server.dto.AbstractPublicationDTO;
import be.lynk.server.dto.BusinessDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.List;

/**
 * Created by florian on 9/09/15.
 */
@org.springframework.stereotype.Controller
public class TownRestController extends AbstractRestController {


    @Autowired
    private BusinessService    businessService;
    @Autowired
    private PublicationService publicationService;

    @Transactional
    public Result getPublicationByBusiness(Long id, Integer page) {

        Business business = businessService.findById(id);

        List<AbstractPublication> abstractPublications = publicationService.findByBusinessForTown(business, page,20);

        return ok(new ListDTO<>(dozerService.map(abstractPublications, AbstractPublicationDTO.class)));
    }

    @Transactional
    public Result getBusinessesByZip(Integer zip) {

        List<Business> businessList = businessService.findByZip(zip.toString());

        return ok(new ListDTO<>(dozerService.map(businessList, BusinessDTO.class)));
    }
}
