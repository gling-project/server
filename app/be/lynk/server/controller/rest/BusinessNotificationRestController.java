package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusAnnotation;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.BusinessNotificationDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.model.entities.publication.BusinessNotification;
import be.lynk.server.service.CustomerInterestService;
import be.lynk.server.service.PublicationService;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.db.jpa.Transactional;
import play.mvc.Result;

/**
 * Created by florian on 1/06/15.
 */
@Component
public class BusinessNotificationRestController extends AbstractRestController {

    @Autowired
    private PublicationService publicationService;
    @Autowired
    private StoredFileService storedFileService;
    @Autowired
    private CustomerInterestService customerInterestService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.PUBLISHED})
    public Result create() {
        BusinessNotificationDTO dto = extractDTOFromRequest(BusinessNotificationDTO.class);


        BusinessNotification businessNotification = dozerService.map(dto, BusinessNotification.class);
        businessNotification.setEndDate(businessNotification.getStartDate().plusMonths(1));

        businessNotification.setBusiness(((BusinessAccount) securityController.getCurrentUser()).getBusiness());
        if (businessNotification.getInterest() != null) {
            businessNotification.setInterest(customerInterestService.findById(businessNotification.getInterest().getId()));
        }

        //TODO control file

        publicationService.saveOrUpdate(businessNotification);

        int order = 0;

        for (StoredFile storedFile : businessNotification.getPictures()) {
            StoredFile originalStoredFile = storedFileService.findByStoredName(storedFile.getStoredName());
            originalStoredFile.setPublication(businessNotification);

            //add comments
            originalStoredFile.setComment(storedFile.getComment());

            originalStoredFile.setFileOrder(++order);

            storedFileService.saveOrUpdate(originalStoredFile);
        }

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatus.PUBLISHED})
    public Result update(Long id) {
        BusinessNotificationDTO dto = extractDTOFromRequest(BusinessNotificationDTO.class);

        BusinessNotification businessNotification = dozerService.map(dto, BusinessNotification.class);

        //load
        BusinessNotification businessNotificationToEdit = (BusinessNotification) publicationService.findById(id);


        //control
        if (businessNotificationToEdit == null || !businessNotificationToEdit.getBusiness().equals(((BusinessAccount) securityController.getCurrentUser()).getBusiness())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        businessNotificationToEdit.setTitle(businessNotification.getTitle());
        businessNotificationToEdit.setDescription(businessNotification.getDescription());
        businessNotification.setEndDate(businessNotification.getStartDate().plusMonths(1));
        businessNotificationToEdit.setStartDate(businessNotification.getStartDate());

        //TODO control file
//        if (businessNotification.getIllustration() != null) {
//
//            businessNotification.setIllustration(storedFileService.findById(businessNotification.getIllustration().getId()));
//        }


        publicationService.saveOrUpdate(businessNotificationToEdit);

        for (StoredFile storedFile : businessNotification.getPictures()) {
            storedFileService.saveOrUpdate(storedFile);
        }

        return ok(dozerService.map(businessNotificationToEdit, BusinessNotificationDTO.class));
    }
}
