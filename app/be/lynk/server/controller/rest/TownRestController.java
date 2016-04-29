package be.lynk.server.controller.rest;

import be.lynk.server.dto.*;
import be.lynk.server.dto.town.TownInitializationDTO;
import be.lynk.server.dto.town.TownPublicationsDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.BusinessNotification;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import play.Configuration;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 9/09/15.
 */
@org.springframework.stereotype.Controller
public class TownRestController extends AbstractRestController {


    private static final Integer PUBLICATION_MAX_RESULTS             = 10;
    private static final Integer PUBLICATION_BY_BUSINESS_MAX_RESULTS = 4;

    @Autowired
    private BusinessService    businessService;
    @Autowired
    private PublicationService publicationService;

    private String fileBucketUrl = Configuration.root().getString("aws.accesFile.url");

    @Transactional
    public Result getPublications(Integer zip, Integer page) {

        TownPublicationsDTO townPublicationsDTO = new TownPublicationsDTO();

        initialization();

        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response().setHeader("Access-Control-Max-Age", "3600");
        response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
        response().setHeader("Access-Control-Allow-Credentials", "true");

        List<AbstractPublication> publications = publicationService.findActiveNotificationByTypeAndZip(zip, page, PUBLICATION_MAX_RESULTS);


        List<BusinessNotificationDTO> publicationDTOs = new ArrayList<>();

        for (AbstractPublication publication : publications) {
            BusinessNotificationDTO map = dozerService.map(publication, BusinessNotificationDTO.class);
            map.setBusinessId(publication.getBusiness().getId());
            map.setBusinessName(publication.getBusiness().getName());
            map.setBusinessIllustration(dozerService.map(publication.getBusiness().getIllustration(), StoredFileDTO.class));

            publicationDTOs.add(map);
        }
        townPublicationsDTO.setNotifications(publicationDTOs);

        List<AbstractPublication> promotions = publicationService.findActivePromotionByTypeAndZip(zip, page, PUBLICATION_MAX_RESULTS);

        List<PromotionDTO> promotionDTOs = new ArrayList<>();

        for (AbstractPublication publication : promotions) {
            PromotionDTO map = dozerService.map(publication, PromotionDTO.class);
            map.setBusinessId(publication.getBusiness().getId());
            map.setBusinessName(publication.getBusiness().getName());
            map.setBusinessIllustration(dozerService.map(publication.getBusiness().getIllustration(), StoredFileDTO.class));

            promotionDTOs.add(map);
        }
        townPublicationsDTO.setPromotions(promotionDTOs);

        return ok(townPublicationsDTO);
    }

    @Transactional
    public Result getPublicationByBusiness(Long id, Integer page) {

        initialization();

        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response().setHeader("Access-Control-Max-Age", "3600");
        response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
        response().setHeader("Access-Control-Allow-Credentials", "true");

        Business business = businessService.findById(id);

        List<AbstractPublication> abstractPublications = publicationService.findByBusinessForTown(business, page, PUBLICATION_BY_BUSINESS_MAX_RESULTS);

        return ok(new ListDTO<>(dozerService.map(abstractPublications, AbstractPublicationDTO.class)));
    }

    @Transactional
    public Result getBusinessesByZip(Integer zip) {

        initialization();

        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response().setHeader("Access-Control-Max-Age", "3600");
        response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
        response().setHeader("Access-Control-Allow-Credentials", "true");

        //!! LIMITED TO 100
        List<Business> businessList = businessService.findByZip(zip.toString(), 0, 100);

        return ok(new ListDTO<>(dozerService.map(businessList, BusinessDTO.class)));
    }

    @Transactional
    public Result getInitialization() {

        TownInitializationDTO townInitializationDTO = new TownInitializationDTO();

        initialization();

        //compile translation
        townInitializationDTO.getConstants().put("fileBucketUrl", fileBucketUrl);

        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response().setHeader("Access-Control-Max-Age", "3600");
        response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
        response().setHeader("Access-Control-Allow-Credentials", "true");

        townInitializationDTO.setTranslations(translationService.getTranslations(lang()));

        return ok(townInitializationDTO);

    }
}
