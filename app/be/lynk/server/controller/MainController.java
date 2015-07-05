package be.lynk.server.controller;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.dto.InterfaceDataDTO;
import be.lynk.server.dto.MyselfDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.util.AppUtil;
import be.lynk.server.dto.LangDTO;
import be.lynk.server.dto.ListDTO;
import play.Configuration;
import play.Logger;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Result;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by florian on 23/03/15.
 */
@org.springframework.stereotype.Controller
public class MainController extends AbstractController {


    String accessKey = Configuration.root().getString("app.status");

    @Transactional
    public Result admin() {

        String facebookAppId = AppUtil.getFacebookAppId();

        //try with param
        InterfaceDataDTO interfaceDataDTO = new InterfaceDataDTO();
        interfaceDataDTO.setLangId(lang().code());
        interfaceDataDTO.setTranslations(translationService.getTranslations(lang()));
        interfaceDataDTO.setAppId(facebookAppId);
        if (securityController.isAuthenticated(ctx())) {
            Account currentUser = securityController.getCurrentUser();
            MyselfDTO accountDTO = dozerService.map(currentUser, MyselfDTO.class);
            accountDTO.setFacebookAccount(currentUser.getFacebookCredential() != null);
            accountDTO.setLoginAccount(currentUser.getLoginCredential() != null);
            interfaceDataDTO.setMySelf(accountDTO);
            Logger.info(currentUser + "<=>" + accountDTO);
        }


        return ok(be.lynk.server.views.html.template_admin.render(getAvaiableLanguage(), interfaceDataDTO));
    }

    @Transactional
    public Result mainPage() {
        return generateDefaultPage(false);
    }

    public Result generateDefaultPage(boolean forceMobile) {

        String facebookAppId = AppUtil.getFacebookAppId();

        //try with param
        InterfaceDataDTO interfaceDataDTO = new InterfaceDataDTO();
        interfaceDataDTO.setLangId(lang().code());
        interfaceDataDTO.setTranslations(translationService.getTranslations(lang()));
        interfaceDataDTO.setAppId(facebookAppId);
        if (securityController.isAuthenticated(ctx())) {
            Account currentUser = securityController.getCurrentUser();
            MyselfDTO accountDTO = dozerService.map(currentUser, MyselfDTO.class);
            accountDTO.setFacebookAccount(currentUser.getFacebookCredential() != null);
            accountDTO.setLoginAccount(currentUser.getLoginCredential() != null);
            interfaceDataDTO.setMySelf(accountDTO);
            Logger.info(currentUser + "<=>" + accountDTO);
        }


        if (isMobileDevice() || forceMobile) {
            return ok(be.lynk.server.views.html.template_mobile.render(getAvaiableLanguage(), interfaceDataDTO));
        } else {
            return ok(be.lynk.server.views.html.template.render(getAvaiableLanguage(), interfaceDataDTO));
        }


    }

    @Transactional
    public Result mobile() {
        return generateDefaultPage(true);
    }

    private ListDTO<LangDTO> getAvaiableLanguage() {

        //compute list lang
        ListDTO<LangDTO> langDTOListDTO = new ListDTO<>();
        for (Lang lang : Lang.availables()) {
            LangDTO langDTO = dozerService.map(lang, LangDTO.class);
            Logger.info(lang + "<=>" + langDTO);
            langDTOListDTO.addElement(langDTO);
        }
        return langDTOListDTO;
    }
}
