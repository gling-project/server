package be.lynk.server.controller;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.controller.technical.security.CommonSecurityController;
import be.lynk.server.dto.*;
import be.lynk.server.model.SearchCriteriaEnum;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.CustomerInterestService;
import be.lynk.server.service.LocalizationService;
import be.lynk.server.service.PublicationService;
import be.lynk.server.util.AppUtil;
import be.lynk.server.util.constants.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import play.Configuration;
import play.Logger;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Http;
import play.mvc.Result;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by florian on 23/03/15.
 */
@org.springframework.stereotype.Controller
public class MainController extends AbstractController {


    @Autowired
    private PublicationService publicationService;
    @Autowired
    private LocalizationService localizationService;
    @Autowired
    private CustomerInterestService customerInterestService;

    /**
     * access to resource from external
     * @param path
     * @param file
     * @return
     */
    public Result externalPath(String path, String file) {
        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response().setHeader("Access-Control-Max-Age", "3600");
        response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
        response().setHeader("Access-Control-Allow-Credentials", "true");
        return ok(new File(path+file));
    }


    public Result comingSoon() {
        return ok(be.lynk.server.views.html.comingSoon.render());
    }


    public Result legal(String url) {
        return ok(be.lynk.server.views.html.legal.render());
    }

    public Result toTown() {
        return ok(be.lynk.server.views.html.town.render(lastVersion));
    }

    @Transactional
    public Result admin(String url) {

        String facebookAppId = AppUtil.getFacebookAppId();

        //try with param
        InterfaceDataDTO interfaceDataDTO = generateInterfaceDTO(false);


        return ok(be.lynk.server.views.html.template_admin.render(getAvaiableLanguage(), interfaceDataDTO));
    }

    @Transactional
    public Result mainPage(String url) {
        return generateDefaultPage(url, false);
    }

    @Transactional
    public Result toAboutPage(String lang) {
        changeLang(lang);
        return ok(be.lynk.server.views.html.about_page.render(getAvaiableLanguage(), dozerService.map(lang(), LangDTO.class)));
    }


    public Result generateDefaultPage(String url, boolean forceMobile) {

        if (url != null && url.equals("app")) {
            return redirect("market://details?id=" + APP_PACKAGE_NAME);
        }

        boolean isMobile = (isMobileDevice() || forceMobile) && mobileDisabled == null;


        InterfaceDataDTO interfaceDataDTO = generateInterfaceDTO(isMobile);


        AbstractPublicationDTO publicationDTO = null;
        if (url != null && url.contains("publication/")) {
            Pattern p = Pattern.compile("publication/([0-9]+)");
            Matcher matcher = p.matcher(url);
            if (matcher.find()) {
                AbstractPublication publication = publicationService.findById(Long.parseLong(matcher.group(1)));
                publicationDTO = dozerService.map(publication, AbstractPublicationDTO.class);

                publicationDTO.setBusinessName(publication.getBusiness().getName());
                publicationDTO.setBusinessIllustration(dozerService.map(publication.getBusiness().getIllustration(), StoredFileDTO.class));
                publicationDTO.setBusinessId(publication.getBusiness().getId());
            }
        }



        //try with param
        if (isMobile) {
            return ok(be.lynk.server.views.html.template_mobile.render(getAvaiableLanguage(), interfaceDataDTO));
        } else {
            return ok(be.lynk.server.views.html.template.render(getAvaiableLanguage(), interfaceDataDTO, publicationDTO));
        }


    }

    @Transactional
    public Result mobile() {
        return generateDefaultPage(null, true);
    }
}
