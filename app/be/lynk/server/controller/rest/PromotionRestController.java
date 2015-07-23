package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusAnnotation;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.dto.PromotionDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.PublicationService;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.Collections;
import java.util.List;

/**
 * Created by florian on 23/05/15.
 */
@Component
public class PromotionRestController extends AbstractRestController {

    @Autowired
    private PublicationService publicationService;
    @Autowired
    private StoredFileService storedFileService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.PUBLISHED})
    public Result create() {
        PromotionDTO dto = extractDTOFromRequest(PromotionDTO.class);

        Promotion promotion = dozerService.map(dto, Promotion.class);

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();

        //TODO control file
//        if (dto.getIllustration() != null) {
//
//            promotion.setIllustration(storedFileService.findById(dto.getIllustration().getId()));
//        }
        promotion.setBusiness(business);

        publicationService.saveOrUpdate(promotion);

        return ok(dozerService.map(promotion, PromotionDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.PUBLISHED})
    public Result update(Long id) {
        PromotionDTO dto = extractDTOFromRequest(PromotionDTO.class);

        Promotion promotion = dozerService.map(dto, Promotion.class);

        //load
        Promotion promotionToEdit = (Promotion) publicationService.findById(id);

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();

        //control
        if (!promotionToEdit.getBusiness().equals(business)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        promotionToEdit.setTitle(promotion.getTitle());
        promotionToEdit.setDescription(promotion.getDescription());
        promotionToEdit.setEndDate(promotion.getEndDate());
        promotionToEdit.setMinimalQuantity(promotion.getMinimalQuantity());
        promotionToEdit.setOriginalPrice(promotion.getOriginalPrice());
        promotionToEdit.setOffPercent(promotion.getOffPercent());
        promotionToEdit.setQuantity(promotion.getQuantity());
        promotionToEdit.setStartDate(promotion.getStartDate());

        //TODO control file
//        if (promotion.getIllustration() != null) {
//            //TODO control file
//            promotionToEdit.setIllustration(storedFileService.findById(promotion.getIllustration().getId()));
//        }
        promotionToEdit.setUnit(promotion.getUnit());

        publicationService.saveOrUpdate(promotionToEdit);

        return ok(dozerService.map(promotionToEdit, PromotionDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result delete(Long id) {
        //load
        Promotion promotion = (Promotion) publicationService.findById(id);
        if (promotion == null || !promotion.getBusiness().equals(((BusinessAccount) securityController.getCurrentUser()).getBusiness())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        publicationService.remove(promotion);

        return ok(new ResultDTO());
    }


}
