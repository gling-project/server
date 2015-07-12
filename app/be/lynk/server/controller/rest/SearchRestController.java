package be.lynk.server.controller.rest;

import be.lynk.server.dto.*;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.*;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.*;

/**
 * Created by florian on 23/05/15.
 */
@org.springframework.stereotype.Controller
public class SearchRestController extends AbstractRestController {


    @Autowired
    private BusinessService businessService;
    @Autowired
    private LocalizationService localizationService;
    @Autowired
    private PublicationService publicationService;
    @Autowired
    private FollowLinkService followLinkService;
    @Autowired
    private CustomerInterestService customerInterestService;

    @Transactional
    public Result getBusiness(long id) {

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        Business byId = businessService.findById(id);

        List<AbstractPublication> publications = byId.getPublications();

        return ok(new ListDTO<>(dozerService.map(publications, AbstractPublicationDTO.class)));
    }


    @Transactional
    public Result getByDefault() {

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        List<AbstractPublication> publications = publicationService.findActivePublication();

        return ok(new ListDTO<>(finalize(dto, publications)));
    }

    @Transactional
    public Result getByInterest(long id) {

        //load interest
        CustomerInterest byId = customerInterestService.findById(id);

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        List<AbstractPublication> publications = publicationService.findActivePublication();

        List<AbstractPublication> finalList = new ArrayList<>();

        //sort
        for (AbstractPublication publication : publications) {
            for (BusinessCategory businessCategory : publication.getBusiness().getBusinessCategories()) {
                for (CategoryInterestLink categoryInterestLink : businessCategory.getLinks()) {
                    if(categoryInterestLink.getCustomerInterest().equals(byId)){
                        finalList.add(publication);
                        break;
                    }
                }
            }

        }


        return ok(new ListDTO<>(finalize(dto, finalList)));
    }

    private List<AbstractPublicationDTO> finalize(PositionDTO dto, List<AbstractPublication> publications) {
        //compute distance
        List<Business> addresses = new ArrayList<>();
        List<AbstractPublicationDTO> l = new ArrayList<>();

        if (publications.size() > 0) {

            //limit to 20 !
            if (publications.size() > 20) {
                publications = publications.subList(0, 20);
            }


            for (AbstractPublication publication : publications) {
                if (!addresses.contains(publication.getBusiness())) {
                    addresses.add(publication.getBusiness());
                }
            }

            Map<Business, Long> addressLongMap = localizationService.distanceBetweenAddresses(dozerService.map(dto, Position.class), addresses);

            for (Map.Entry<Business, Long> addressLongEntry : addressLongMap.entrySet()) {
                for (AbstractPublication publication : publications) {
                    if (addressLongEntry.getKey().equals(publication.getBusiness())) {

                        AbstractPublicationDTO publicationDTO = dozerService.map(publication, AbstractPublicationDTO.class);
                        publicationDTO.setDistance(addressLongEntry.getValue());
                        l.add(publicationDTO);
                        //add business name
                        publicationDTO.setBusinessName(publication.getBusiness().getName());
                        publicationDTO.setBusinessIllustration(dozerService.map(publication.getBusiness().getIllustration(),StoredFileDTO.class));
                        publicationDTO.setBusinessId(publication.getBusiness().getId());
                        //follow ?
                        if (securityController.isAuthenticated(ctx())) {
                            Account account = securityController.getCurrentUser();
                            if (account instanceof CustomerAccount) {
                                publicationDTO.setFollowing(followLinkService.testByAccountAndBusiness((CustomerAccount) account, publication.getBusiness()));
                            }
                        }
                        publicationDTO.setTotalFollowers(followLinkService.countByBusiness(publication.getBusiness()));
                    }
                }
            }
        }

        Collections.sort(l);

        return l;//
    }
}
