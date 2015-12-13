package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusAnnotation;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.BusinessNotificationDTO;
import be.lynk.server.dto.StoredFileDTO;
import be.lynk.server.model.email.EmailMessage;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.model.entities.publication.BusinessNotification;
import be.lynk.server.service.*;
import be.lynk.server.service.impl.NotificationServiceImpl;
import be.lynk.server.util.constants.Constant;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.EmailMessageEnum;
import be.lynk.server.util.message.ErrorMessageEnum;
import be.lynk.server.util.message.NotificationMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Result;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

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
    @Autowired
    private EmailService emailService;
    @Autowired
    private FileService fileService;
    @Autowired
    private NotificationService notificationService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.PUBLISHED})
    public Result create() {
        BusinessNotificationDTO dto = initialization(BusinessNotificationDTO.class);

        return create(dto,securityController.getCurrentUser().getBusiness());
    }

    public Result create(BusinessNotificationDTO dto,Business business) {


        BusinessNotification businessNotification = dozerService.map(dto, BusinessNotification.class);

        businessNotification.setBusiness(business);
        if (businessNotification.getInterest() != null) {
            businessNotification.setInterest(customerInterestService.findById(businessNotification.getInterest().getId()));
        }

        //control start date
        if (businessNotification.getStartDate().compareTo(LocalDateTime.now().minusHours(1)) == -1) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_PUBLICATION_STARTDATE_BEFORE_NOW);
        }

        //control date
        Duration duration = Duration.between(businessNotification.getStartDate(), businessNotification.getEndDate());
        long seconds = duration.getSeconds();
        long x = Constant.NOTIFICATION_PERIOD_MAX_DAY * 24 * 60 * 60;
        //add 1 hour
        x += 60 * 60;
        if (duration.getSeconds() > x) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_NOTIFICATION_DURATION_TOO_LONG, Constant.NOTIFICATION_PERIOD_MAX_DAY);
        }

        //control number by day
        if (publicationService.countPublicationForWeek(businessNotification.getStartDate(), securityController.getBusiness()) >= Constant.PUBLICATION_MAX_BY_WEEK) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_PUBLICATION_TOO_MUCH_TODAY, Constant.PUBLICATION_MAX_BY_WEEK);
        }

        publicationService.saveOrUpdate(businessNotification);

        int order = 0;

        for (StoredFileDTO storedFileDTO : dto.getPictures()) {

            StoredFile storedFile;
            if (storedFileDTO.getImage64() != null) {
                storedFile = fileService.updateBase64(storedFileDTO.getImage64(), storedFileDTO.getOriginalName(), securityController.getCurrentUser());
            } else {
                storedFile = storedFileService.findByStoredName(storedFileDTO.getStoredName());
            }

            //add comments
            storedFile.setPublication(businessNotification);
            storedFile.setComment(storedFileDTO.getComment());
            storedFile.setFileOrder(++order);

            storedFileService.saveOrUpdate(storedFile);
        }


        BusinessNotificationDTO publicationDTO = dozerService.map(publicationService.findById(businessNotification.getId()), BusinessNotificationDTO.class);

        publicationDTO.setBusinessName(businessNotification.getBusiness().getName());
        publicationDTO.setBusinessIllustration(dozerService.map(businessNotification.getBusiness().getIllustration(), StoredFileDTO.class));
        publicationDTO.setBusinessId(businessNotification.getBusiness().getId());

//        //send a notification
//        NotificationServiceImpl.NotificationMessage title = new NotificationServiceImpl.NotificationMessage(NotificationMessageEnum.NEW_BUSINESS_NOTIFICATION, businessNotification.getBusiness().getName());
//        NotificationServiceImpl.NotificationMessage content = new NotificationServiceImpl.NotificationMessage(publicationDTO.getTitle());
//        notificationService.sendNotification(title, content, followLinkService.findAccountByBusiness(businessNotification.getBusiness()));


        return ok(publicationDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    @BusinessStatusAnnotation(status = {BusinessStatusEnum.PUBLISHED})
    public Result update(Long id) {
        BusinessNotificationDTO dto = initialization(BusinessNotificationDTO.class);

        BusinessNotification businessNotification = dozerService.map(dto, BusinessNotification.class);

        //load
        BusinessNotification businessNotificationToEdit = (BusinessNotification) publicationService.findById(id);


        //control business
        Business business = businessNotificationToEdit.getBusiness();

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }

        String oldName = businessNotificationToEdit.getTitle();

        if (businessNotificationToEdit.getInterest() != null) {
            businessNotificationToEdit.setInterest(customerInterestService.findByName(businessNotification.getInterest().getName()));
        }
        businessNotificationToEdit.setTitle(businessNotification.getTitle());
        businessNotificationToEdit.setDescription(businessNotification.getDescription());

        publicationService.saveOrUpdate(businessNotificationToEdit);


        Map<StoredFile, Boolean> newPictures = new HashMap<>();

        for (StoredFile storedFile : businessNotification.getPictures()) {
            newPictures.put(storedFile, false);
        }

        int biggestOrder = 0;
        for (int i = businessNotificationToEdit.getPictures().size() - 1; i >= 0; i--) {

            StoredFile storedFile = businessNotificationToEdit.getPictures().get(i);

            boolean founded = false;
            for (Map.Entry<StoredFile, Boolean> storedFileBooleanEntry : newPictures.entrySet()) {
                if (storedFile.getStoredName().equals(storedFileBooleanEntry.getKey().getStoredName())) {
                    founded = true;
                    storedFileBooleanEntry.setValue(true);
                    if (storedFile.getFileOrder() > biggestOrder) {
                        biggestOrder = storedFile.getFileOrder();
                    }
                }
            }

            //not found ? remove!
            if (!founded) {
                businessNotificationToEdit.getPictures().remove(storedFile);
                publicationService.saveOrUpdate(businessNotificationToEdit);
                storedFileService.remove(storedFile);
            }
        }


        for (Map.Entry<StoredFile, Boolean> storedFileBooleanEntry : newPictures.entrySet()) {
            if (!storedFileBooleanEntry.getValue()) {

                StoredFile storedFile = storedFileBooleanEntry.getKey();

                StoredFile originalStoredFile = storedFileService.findByStoredName(storedFile.getStoredName());
                originalStoredFile.setPublication(businessNotificationToEdit);

                //add comments
                originalStoredFile.setComment(storedFile.getComment());

                originalStoredFile.setFileOrder(++biggestOrder);

                storedFileService.saveOrUpdate(originalStoredFile);
            }
        }

        //send email if user is superadmin
        if (securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN)  && dto.getEditionReason()!=null && dto.getEditionReason().length()>0) {

            Lang lang = business.getAccount().getLang();
            EmailMessage.Recipient target = new EmailMessage.Recipient(business.getAccount());

            String title = translationService.getTranslation(EmailMessageEnum.PUBLICATION_EDIT_BY_ADMIN_SUBJECT, lang);
            String message = translationService.getTranslation(EmailMessageEnum.PUBLICATION_EDIT_BY_ADMIN_BODY, lang, oldName, dto.getEditionReason());

            EmailMessage emailMessage = new EmailMessage(target, title, message);

            emailService.sendEmail(emailMessage, lang);
        }

        return ok(dozerService.map(businessNotificationToEdit, BusinessNotificationDTO.class));
    }
}
