package be.lynk.server.controller.rest;

import be.lynk.server.dto.*;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.*;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.FollowLinkService;
import be.lynk.server.service.LocalizationService;
import be.lynk.server.service.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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


    @Transactional
    public Result getByPromotion() {

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        List<AbstractPublication> promotions = publicationService.findActivePublication();
        List<AbstractPublicationDTO> promotionDTOs = new ArrayList<>();

        //compute distance
        List<Address> addresses = new ArrayList<>();

        if (promotions.size() > 0) {

            for (AbstractPublication promotion : promotions) {
                addresses.add(promotion.getBusiness().getAddress());
            }

            Map<Address, Long> addressLongMap = localizationService.distanceBetweenAddresses(dozerService.map(dto, Position.class), addresses);

            for (Map.Entry<Address, Long> addressLongEntry : addressLongMap.entrySet()) {
                for (AbstractPublication publication : promotions) {
                    if (addressLongEntry.getKey().equals(publication.getBusiness().getAddress())) {

                        AbstractPublicationDTO publicationDTO = dozerService.map(publication, AbstractPublicationDTO.class);
                        publicationDTO.setDistance(addressLongEntry.getValue());
                        promotionDTOs.add(publicationDTO);
                        //add business name
                        publicationDTO.setBusinessName(publication.getBusiness().getName());
                        publicationDTO.setBusinessId(publication.getBusiness().getId());
                        //follow ?
                        if(securityController.getCurrentUser()!=null){
                            Account account = securityController.getCurrentUser();
                            if(account instanceof CustomerAccount){
                                publicationDTO.setFollowing(followLinkService.testByAccountAndBusiness((CustomerAccount) account,publication.getBusiness()));
                            }
                        }
                        publicationDTO.setTotalFollowers(followLinkService.countByBusiness(publication.getBusiness()));
                    }
                }
            }
        }

        return ok(new ListDTO<>(promotionDTOs));
    }
}
