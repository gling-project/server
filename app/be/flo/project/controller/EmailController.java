package be.flo.project.controller;

import be.flo.project.controller.technical.AbstractController;
import be.flo.project.model.entities.Account;
import be.flo.project.service.EmailService;
import be.flo.project.service.TranslationService;
import be.flo.project.util.message.EmailMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.Transactional;

/**
 * Created by florian on 6/12/14.
 */
@org.springframework.stereotype.Controller
public class EmailController extends AbstractController {

    //service
    @Autowired
    private EmailService emailService;
    @Autowired
    private TranslationService translationService;

    @Transactional
    public void sendApplicationRegistrationEmail(Account account){

//        String title = translationService.getTranslation(EmailMessageEnum.REGISTRATION_APP_EMAIL_TITLE,lang());
//TODO
//        // 0 => account.name
//        // 1 => password
//        String body = translationService.getTranslation(EmailMessage.REGISTRATION_APP_EMAIL_BODY,lang(),
//                account.getFirstname()+" "+account.getLastname(),
//                account.getPassword());

//        try {
//            emailService.sendEmail(account, title, body);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
    }

    @Transactional
    public void sendNewPasswordEmail(Account account) {

//        String title = translationService.getTranslation(
//                EmailMessageEnum.NEW_PASSWORD_EMAIL_TITLE,
//                account.getLang());

        //TODO
//        String body = translationService.getTranslation(
//                EmailMessage.NEW_PASSWORD_EMAIL_BODY,
//                account.getLang(),
//                account.getFirstname()+" "+account.getLastname(),
//                account.getPassword());

//        try {
//            emailService.sendEmail(account,title,body);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
    }
}
