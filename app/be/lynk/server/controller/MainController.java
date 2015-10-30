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
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Result;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by florian on 23/03/15.
 */
@org.springframework.stereotype.Controller
public class MainController extends AbstractController {

    private static final String APP_PACKAGE_NAME = "be.gling.android";

    //    private String AWSBuckect     =
    private String fileBucketUrl  = Configuration.root().getString("aws.accesFile.url");
    //"https://dcz35ar8sf5qb.cloudfront.net";//https://s3.amazonaws.com/" + AWSBuckect;
    //"https://s3.amazonaws.com/" + AWSBuckect; (gling-prod)
    private String urlBase        = Configuration.root().getString("site.url.base");
    private String mobileDisabled = Configuration.root().getString("site.mobile.disabled");
    private String lastVersion    = Configuration.root().getString("project.lastVersion");
    private String appStatus      = Configuration.root().getString("app.status");


    @Autowired
    private PublicationService      publicationService;
    @Autowired
    private LocalizationService     localizationService;
    @Autowired
    private CustomerInterestService customerInterestService;


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
        InterfaceDataDTO interfaceDataDTO = generateInterfaceDTO();


        return ok(be.lynk.server.views.html.template_admin.render(getAvaiableLanguage(), interfaceDataDTO));
    }

    @Transactional
    public Result mainPage(String url) {
        return generateDefaultPage(url, false);
    }

    @Transactional
    public Result toWelcomePage(String lang) {
        changeLang(lang);
        if (ctx().request().cookie(CommonSecurityController.COOKIE_ALREADY_VISITED) == null) {
            addAlreadyVisitedCookie();
        }
        return ok(be.lynk.server.views.html.welcome_page.render(getAvaiableLanguage(), dozerService.map(lang(), LangDTO.class)));
    }


    public Result generateDefaultPage(String url, boolean forceMobile) {

        if (url != null && url.equals("app")) {
            return redirect("market://details?id=" + APP_PACKAGE_NAME);
        }

        if (!isMobileDevice() && !forceMobile && ctx().request().cookie(CommonSecurityController.COOKIE_ALREADY_VISITED) == null && (url == null || url == "")) {
            addAlreadyVisitedCookie();
            return ok(be.lynk.server.views.html.welcome_page.render(getAvaiableLanguage(), dozerService.map(lang(), LangDTO.class)));
        } else {


            InterfaceDataDTO interfaceDataDTO = generateInterfaceDTO();


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


            if ((isMobileDevice() || forceMobile) && mobileDisabled == null) {
                return ok(be.lynk.server.views.html.template_mobile.render(getAvaiableLanguage(), interfaceDataDTO));
            } else {
                return ok(be.lynk.server.views.html.template.render(getAvaiableLanguage(), interfaceDataDTO, publicationDTO));
            }

        }

    }

    @Transactional
    public Result mobile() {
        return generateDefaultPage(null, true);
    }

    private ListDTO<LangDTO> getAvaiableLanguage() {

        //compute list lang
        ListDTO<LangDTO> langDTOListDTO = new ListDTO<>();
        for (Lang lang : Lang.availables()) {
            LangDTO langDTO = dozerService.map(lang, LangDTO.class);
            langDTOListDTO.addElement(langDTO);
        }
        return langDTOListDTO;
    }

    private List<SearchCriteriaDTO> getSearchCriteria() {
        List<SearchCriteriaDTO> finalList = new ArrayList<>();
        for (SearchCriteriaEnum searchCriteriaEnum : SearchCriteriaEnum.values()) {
            finalList.add(dozerService.map(searchCriteriaEnum, SearchCriteriaDTO.class));
        }

        return finalList;
    }


    private void addAlreadyVisitedCookie() {
        ctx().response().setCookie(CommonSecurityController.COOKIE_ALREADY_VISITED, "true", 2592000);
    }

    private InterfaceDataDTO generateInterfaceDTO() {


        String facebookAppId = AppUtil.getFacebookAppId();
        InterfaceDataDTO interfaceDataDTO = new InterfaceDataDTO();
        interfaceDataDTO.setLangId(lang().code());
        interfaceDataDTO.setCustomerInterests(dozerService.map(customerInterestService.findAll(), CustomerInterestDTO.class));
        interfaceDataDTO.setFileBucketUrl(fileBucketUrl);
        interfaceDataDTO.setTranslations(translationService.getTranslations(lang()));
        interfaceDataDTO.setAppId(facebookAppId);
        interfaceDataDTO.setAddStatus(appStatus);
        interfaceDataDTO.setUrlBase(urlBase);
        interfaceDataDTO.setProjectLastVersion(lastVersion);
        interfaceDataDTO.setSearchCriterias(getSearchCriteria());

        //constant
        interfaceDataDTO.getConstants().put("PUBLICATION_PICTURE_HEIGHT", Constant.PUBLICATION_PICTURE_HEIGHT + "");
        interfaceDataDTO.getConstants().put("PUBLICATION_PICTURE_WIDTH", Constant.PUBLICATION_PICTURE_WIDTH + "");

        if (securityController.isAuthenticated(ctx())) {
            Account currentUser = securityController.getCurrentUser();

            if (!currentUser.getLang().code().equals(interfaceDataDTO.getLangId())) {
                changeLang(currentUser.getLang().code());
                interfaceDataDTO.setLangId(currentUser.getLang().code());
            }

            MyselfDTO accountDTO = dozerService.map(currentUser, MyselfDTO.class);
            accountDTO.setFacebookAccount(currentUser.getFacebookCredential() != null);
            accountDTO.setLoginAccount(currentUser.getLoginCredential() != null);
            interfaceDataDTO.setMySelf(accountDTO);

        }
        return interfaceDataDTO;
    }

}
