package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.dto.PromotionDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.Promotion;
import be.lynk.server.service.PromotionService;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.Set;

/**
 * Created by florian on 23/05/15.
 */
@Component
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

        if(promotion.getIllustration()!=null){
            promotion.setIllustration(storedFileService.findById(promotion.getIllustration().getId()));
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
        promotionToEdit.setIllustration(promotion.getIllustration());
        promotionToEdit.setUnit(promotion.getUnit());

        promotionService.saveOrUpdate(promotionToEdit);

        return ok(dozerService.map(promotionToEdit, PromotionDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result getMine() {

        Logger.info("REQUEST    PROMOTION    : : "+request().uri());

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();

        Set<Promotion> promotions = business.getPromotions();

        ListDTO<PromotionDTO> promotionDTOListDTO = new ListDTO<>(dozerService.map(promotions, PromotionDTO.class));

        Logger.info("PROMOTION ------ :"+promotionDTOListDTO);

        return ok(promotionDTOListDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result delete(Long id){
        //load
        Promotion promotion = promotionService.findById(id);
        if(promotion==null || !promotion.getBusiness().equals(((BusinessAccount)securityController.getCurrentUser()).getBusiness())){
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        promotionService.remove(promotion);

        return ok(new ResultDTO());
    }



}
