package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.dto.PromotionDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.Promotion;
import be.lynk.server.service.PromotionService;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.Set;

/**
 * Created by florian on 23/05/15.
 */
@Controller
public class PromotionRestController extends AbstractRestController {

    @Autowired
    private PromotionService promotionService;
    @Autowired
    private StoredFileService storedFileService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result create() {
        PromotionDTO dto = extractDTOFromRequest(PromotionDTO.class);

        Promotion promotion = dozerService.map(dto, Promotion.class);

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();

        if(promotion.getImage()!=null){
            promotion.setImage(storedFileService.findById(promotion.getImage().getId()));
        }
        promotion.setBusiness(business);

        promotionService.saveOrUpdate(promotion);

        return ok(dozerService.map(promotion, PromotionDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result update(Long id) {
        PromotionDTO dto = extractDTOFromRequest(PromotionDTO.class);

        Promotion promotion = dozerService.map(dto, Promotion.class);

        //load
        Promotion promotionToEdit = promotionService.findById(id);

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();

        //control
        if (!promotionToEdit.getBusiness().equals(business)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        promotionToEdit.setDescription(promotion.getDescription());
        promotionToEdit.setEndDate(promotion.getEndDate());
        promotionToEdit.setMinimalQuantity(promotion.getMinimalQuantity());
        promotionToEdit.setPrice(promotion.getPrice());
        promotionToEdit.setQuantity(promotion.getQuantity());
        promotionToEdit.setStartDate(promotion.getStartDate());
        promotionToEdit.setImage(promotion.getImage());
        promotionToEdit.setUnit(promotion.getUnit());

        promotionService.saveOrUpdate(promotionToEdit);

        return ok(dozerService.map(promotionToEdit, PromotionDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result getAll() {

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();


        Set<Promotion> promotions = business.getPromotions();

        return ok(new ListDTO<PromotionDTO>(dozerService.map(promotions, PromotionDTO.class)));
    }


}
