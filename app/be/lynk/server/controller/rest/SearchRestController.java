package be.lynk.server.controller.rest;

import be.lynk.server.dto.*;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.LocalizationService;
import be.lynk.server.service.PromotionService;
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
    private PromotionService promotionService;

    @Transactional
    public Result getByPromotion() {

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        List<Promotion> promotions = promotionService.findActivePromotion();
        List<PromotionDTO> promotionDTOs = new ArrayList<>();

        //compute distance
        List<Address> addresses = new ArrayList<>();

        for (Promotion promotion : promotions) {
            addresses.add(promotion.getBusiness().getAddress());
        }

        //origin
        //CustomerAccount currentUser = (CustomerAccount) securityController.getCurrentUser();
        //Address origin = currentUser.getAddresses().iterator().next();

        Map<Address, Long> addressLongMap = localizationService.distanceBetweenAddresses(dozerService.map(dto, Position.class), addresses);

        for (Map.Entry<Address, Long> addressLongEntry : addressLongMap.entrySet()) {
            for (Promotion promotion : promotions) {
                if (addressLongEntry.getKey().equals(promotion.getBusiness().getAddress())) {
                    PromotionDTO promotionDTO = dozerService.map(promotion, PromotionDTO.class);
                    promotionDTO.setDistance(addressLongEntry.getValue());
                    promotionDTOs.add(promotionDTO);
                }
            }
        }

        return ok(new ListDTO<>(promotionDTOs));
    }

    @Transactional
    public Result test() {


        Address origin = new Address();
        origin.setStreet("place des bienfaiteur 27");
        origin.setZip("1030");
        origin.setCity("Bruxelles");
        origin.setCountry("Belgique");

        List<Address> address = new ArrayList<>();

        Address address1 = new Address();
        address1.setStreet("rue charles legrelle 19");
        address1.setZip("1040");
        address1.setCity("Bruxelles");
        address1.setCountry("Belgique");
        address.add(address1);

        Address address2 = new Address();
        address2.setStreet("rue de la paix 3");
        address2.setZip("1420");
        address2.setCity("Braine l'alleux");
        address2.setCountry("Belgique");
        address.add(address2);

        Address address3 = new Address();
        address3.setStreet("5 RUE LULAY DES FÈBVRES");
        address3.setZip("4000");
        address3.setCity("Liège");
        address3.setCountry("Belgique");
        address.add(address3);


        Map<Address, Long> addressLongMap = localizationService.distanceBetweenAddresses(origin, address);

        for (Map.Entry<Address, Long> addressLongEntry : addressLongMap.entrySet()) {
            Logger.info(addressLongEntry.getKey() + "=>" + addressLongEntry.getValue());
        }


        return ok();
    }

    private boolean compareAddress(Address address, AddressDTO addressDTO) {
        Address map = dozerService.map(addressDTO, Address.class);
        return map.equals(address);
    }
}
