package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.BusinessNotificationDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.*;
import be.lynk.server.model.entities.publication.BusinessNotification;
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
 * Created by florian on 1/06/15.
 */
@Component
public class BusinessNotificationRestController extends AbstractRestController {

    @Autowired
    private PublicationService publicationService;
    @Autowired
    private StoredFileService storedFileService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result create() {
        BusinessNotificationDTO dto = extractDTOFromRequest(BusinessNotificationDTO.class);

        BusinessNotification businessNotification = dozerService.map(dto, BusinessNotification.class);

        businessNotification.setBusiness(((BusinessAccount) securityController.getCurrentUser()).getBusiness());

        if (businessNotification.getIllustration() != null) {
            //TODO control file
            businessNotification.setIllustration(storedFileService.findById(businessNotification.getIllustration().getId()));
        }

        publicationService.saveOrUpdate(businessNotification);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result update(Long id) {
        BusinessNotificationDTO dto = extractDTOFromRequest(BusinessNotificationDTO.class);

        BusinessNotification businessNotification = dozerService.map(dto, BusinessNotification.class);

        //load
        BusinessNotification businessNotificationToEdit = (BusinessNotification) publicationService.findById(id);


        //control
        if (businessNotificationToEdit == null || !businessNotificationToEdit.getBusiness().equals(((BusinessAccount) securityController.getCurrentUser()).getBusiness())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        businessNotificationToEdit.setDescription(businessNotification.getDescription());
        businessNotificationToEdit.setEndDate(businessNotification.getEndDate());
        businessNotificationToEdit.setStartDate(businessNotification.getStartDate());
        if (businessNotification.getIllustration() != null) {
            //TODO control file
            businessNotification.setIllustration(storedFileService.findById(businessNotification.getIllustration().getId()));
        }


        publicationService.saveOrUpdate(businessNotificationToEdit);

        return ok(dozerService.map(businessNotificationToEdit, BusinessNotificationDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result get() {

        Logger.info("REQUEST    BUSINESS    : : "+request().uri());

        BusinessAccount account = (BusinessAccount) securityController.getCurrentUser();
        Business business = account.getBusiness();

        List<BusinessNotification> businessNotifications = publicationService.findByTypeAndBusiness(BusinessNotification.class, business);

        Collections.sort(businessNotifications);

        ListDTO<BusinessNotificationDTO> businessNotificationDTOListDTO = new ListDTO<>(dozerService.map(businessNotifications, BusinessNotificationDTO.class));

        Logger.info("NOTIFICATION  :" + businessNotificationDTOListDTO);

        return ok(businessNotificationDTOListDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result delete(Long id) {
        //load
        BusinessNotification businessNotification = (BusinessNotification) publicationService.findById(id);
        if (businessNotification == null || !businessNotification.getBusiness().equals(((BusinessAccount) securityController.getCurrentUser()).getBusiness())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        publicationService.remove(businessNotification);

        return ok(new ResultDTO());
    }
}
