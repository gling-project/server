package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusAnnotation;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.PromotionDTO;
import be.lynk.server.dto.StoredFileDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.CustomerInterestService;
import be.lynk.server.service.PublicationService;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.constants.Constant;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.time.Duration;
import java.time.LocalDateTime;

/**
 * Created by florian on 23/05/15.
 */
@Component
public class PromotionRestController extends AbstractRestController {

    @Autowired
    private PublicationService publicationService;
    @Autowired
    private StoredFileService storedFileService;
    @Autowired
    private CustomerInterestService customerInterestService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.PUBLISHED})
    public Result create() {
        PromotionDTO dto = initialization(PromotionDTO.class);

        Promotion promotion = dozerService.map(dto, Promotion.class);

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();

        //control start date
        if(promotion.getStartDate().compareTo(LocalDateTime.now().minusHours(1))==-1){
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_PUBLICATION_STARTDATE_BEFORE_NOW);
        }

        //control date
        Duration duration= Duration.between(promotion.getStartDate(), promotion.getEndDate());
        if(duration.getSeconds() > Constant.PROMOTION_PERIOD_MAX_DAY*24*60*60){
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_PROMOTION_DURATION_TOO_LONG,Constant.PROMOTION_PERIOD_MAX_DAY+"");
        }

        //control number by day
        if(publicationService.countPublicationForToday(promotion.getStartDate(),securityController.getBusiness())>Constant.PUBLICATION_MAX_BY_DAY){
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_PUBLICATION_TOO_MUCH_TODAY,Constant.PUBLICATION_MAX_BY_DAY+"");
        }


        promotion.setBusiness(business);

        if (promotion.getInterest() != null) {
            promotion.setInterest(customerInterestService.findById(promotion.getInterest().getId()));
        }

        publicationService.saveOrUpdate(promotion);

        int order = 0;

        for (StoredFile storedFile : promotion.getPictures()) {
            StoredFile originalStoredFile = storedFileService.findByStoredName(storedFile.getStoredName());
            originalStoredFile.setPublication(promotion);

            //add comments
            originalStoredFile.setComment(storedFile.getComment());

            originalStoredFile.setFileOrder(++order);

            storedFileService.saveOrUpdate(originalStoredFile);
        }

        PromotionDTO publicationDTO = dozerService.map(promotion, PromotionDTO.class);

        publicationDTO.setBusinessName(promotion.getBusiness().getName());
        publicationDTO.setBusinessIllustration(dozerService.map(promotion.getBusiness().getIllustration(), StoredFileDTO.class));
        publicationDTO.setBusinessId(promotion.getBusiness().getId());


        return ok(publicationDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.PUBLISHED})
    public Result update(Long id) {
        PromotionDTO dto = initialization(PromotionDTO.class);

        Promotion promotion = dozerService.map(dto, Promotion.class);

        //load
        Promotion promotionToEdit = (Promotion) publicationService.findById(id);

        //control business
        Business business = promotionToEdit.getBusiness();
        Account account = securityController.getCurrentUser();

        if(!account.getRole().equals(RoleEnum.SUPERADMIN) &&
                !((BusinessAccount)account).getBusiness().equals(business)){
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
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


}
