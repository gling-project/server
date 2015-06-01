package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.BusinessNotificationDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.dto.PromotionDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.BusinessNotificationService;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.Date;
import java.util.Set;

/**
 * Created by florian on 1/06/15.
 */
@Controller
public class BusinessNotificationRestController extends AbstractRestController {

    @Autowired
    private BusinessNotificationService businessNotificationService;
    @Autowired
    private StoredFileService storedFileService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result create() {
        BusinessNotificationDTO dto = extractDTOFromRequest(BusinessNotificationDTO.class);

        BusinessNotification businessNotification = dozerService.map(dto, BusinessNotification.class);

        businessNotification.setBusiness(((BusinessAccount) securityController.getCurrentUser()).getBusiness());

        if (businessNotification.getIllustration() != null) {
            businessNotification.setIllustration(storedFileService.findById(businessNotification.getIllustration().getId()));
        }

        businessNotificationService.saveOrUpdate(businessNotification);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result update(Long id) {
        BusinessNotificationDTO dto = extractDTOFromRequest(BusinessNotificationDTO.class);

        BusinessNotification businessNotification = dozerService.map(dto, BusinessNotification.class);

        //load
        BusinessNotification businessNotificationToEdit = businessNotificationService.findById(id);


        //control
        if (businessNotificationToEdit == null || !businessNotificationToEdit.getBusiness().equals(((BusinessAccount) securityController.getCurrentUser()).getBusiness())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        businessNotificationToEdit.setDescription(businessNotification.getDescription());
        businessNotificationToEdit.setEndDate(businessNotification.getEndDate());
        businessNotificationToEdit.setStartDate(businessNotification.getStartDate());
        businessNotificationToEdit.setIllustration(businessNotification.getIllustration());

        businessNotificationService.saveOrUpdate(businessNotificationToEdit);

        return ok(dozerService.map(businessNotificationToEdit, BusinessNotificationDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result getMine() {

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();

        Set<BusinessNotification> businessNotifications = business.getBusinessNotification();

        ListDTO<BusinessNotificationDTO> businessNotificationDTOListDTO = new ListDTO<>(dozerService.map(businessNotifications, BusinessNotificationDTO.class));

        Logger.info("NOTIFICATION ççççççç :" + businessNotificationDTOListDTO);

        return ok(businessNotificationDTOListDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result delete(Long id) {
        //load
        BusinessNotification businessNotification = businessNotificationService.findById(id);
        if (businessNotification == null || !businessNotification.getBusiness().equals(((BusinessAccount) securityController.getCurrentUser()).getBusiness())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        businessNotificationService.remove(businessNotification);

        return ok(new ResultDTO());
    }
}
