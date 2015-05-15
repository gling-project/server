package be.flo.project.controller;

import be.flo.project.controller.technical.AbstractController;
import be.flo.project.dto.*;
import be.flo.project.util.AppUtil;
import play.Configuration;
import play.Logger;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Result;

/**
 * Created by florian on 23/03/15.
 */
@org.springframework.stereotype.Controller
public class MainController extends AbstractController {


    String accessKey = Configuration.root().getString("app.status");

    @Transactional
    public Result mainPage() {
        return generateDefaultPage(false);
    }

    public Result generateDefaultPage(boolean forceMobile){

        String facebookAppId = AppUtil.getFacebookAppId();

        //try with param
        InterfaceDataDTO interfaceDataDTO = new InterfaceDataDTO();
        interfaceDataDTO.setLangId(lang().code());
        interfaceDataDTO.setTranslations(translationService.getTranslations(lang()));
        interfaceDataDTO.setAppId(facebookAppId);
        if (securityController.isAuthenticated(ctx())) {
            MyselfDTO accountDTO = dozerService.map(securityController.getCurrentUser(), MyselfDTO.class);
            accountDTO.setFacebookAccount(securityController.getCurrentUser().getFacebookCredential() != null);
            accountDTO.setLoginAccount(securityController.getCurrentUser().getLoginCredential() != null);
            interfaceDataDTO.setMySelf(accountDTO);
            Logger.info(securityController.getCurrentUser() + "<=>" + accountDTO);
        }

        if (isMobileDevice() || forceMobile) {
            return ok(be.flo.project.views.html.template_mobile.render(getAvaiableLanguage(), interfaceDataDTO));
        } else {
            return ok(be.flo.project.views.html.template.render(getAvaiableLanguage(), interfaceDataDTO));
        }
    }

    @Transactional
    public Result mobile(){
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
