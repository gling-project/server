package be.lynk.server.controller;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.model.entities.Account;
import be.lynk.server.service.EmailService;
import be.lynk.server.service.TranslationService;
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
