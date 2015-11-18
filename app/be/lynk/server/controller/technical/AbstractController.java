package be.lynk.server.controller.technical;

import be.lynk.server.controller.technical.security.CommonSecurityController;
import be.lynk.server.dto.*;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.FollowLink;
import be.lynk.server.model.entities.Session;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.service.*;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.*;


/**
 * Created by florian on 10/11/14.
 */
public abstract class AbstractController extends Controller {

    //controllers
    @Autowired
    protected CommonSecurityController securityController;
    //service
    @Autowired
    protected TranslationService       translationService;
    @Autowired
    protected DozerService             dozerService;
    @Autowired
    private   MongoDBOperator          mongoDBOperator;
    @Autowired
    protected FollowLinkService        followLinkService;
    @Autowired
    private   LocalizationService      localizationService;
    @Autowired
    protected BusinessService          businessService;

    protected void initialization() {
        initialization(ResultDTO.class, false);
    }

    /**
     * this function control the dto (via play.validation annotation) and return it if it's valid, or throw a runtimeException with an error message if not.
     */
    protected <T extends DTO> T initialization(Class<T> dtoClass) {
        return initialization(dtoClass, false);
    }


    protected <T extends DTO> List<T> initializationList(Class<T> classExpected) {
        List<T> resultList = new ArrayList<>();
        JsonNode parse = request().body().asJson();//Json.parse(new String(contentAsBytes(result)));
        JsonNode list = parse.get("list");
        Iterator<JsonNode> elements = list.elements();
        while (elements.hasNext()) {
            T item = Json.fromJson(elements.next(), classExpected);
            validation(item);
            resultList.add(item);
        }

        saveInMongo(new ListDTO<>(resultList), ListDTO.class);


        return resultList;
    }


    protected <T extends DTO> T initialization(Class<T> dtoClass, boolean nullable) {
        return initialization(dtoClass, nullable, true);
    }

    protected <T extends DTO> T initialization(Class<T> dtoClass, boolean nullable, boolean saveIntoMongo) {

        T dto;

        if (dtoClass != ResultDTO.class) {

            //extract the json node
            Http.RequestBody body = request().body();
            JsonNode node = body.asJson();
            //extract dto
            dto = DTO.getDTO(node, dtoClass);
            if (dto == null) {
                if (nullable) {
                    return null;
                }
                throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR, dtoClass.getName());
            }

            validation(dto);
        } else {
            //create DTO for mongo
            dto = (T) new ResultDTO();
        }

        //add user id
        if (securityController.isAuthenticated(ctx())) {
            dto.setCurrentAccountId(securityController.getCurrentUser().getId());
        }
        //write

        //build params list
        if (saveIntoMongo) {
            saveInMongo(dto, dtoClass);
        }


        return dto;
    }


    private <T extends DTO> void saveInMongo(T dto, Class<T> dtoClass) {


        String route = (String) ctx().args.get("ROUTE_CONTROLLER");
        String action = (String) ctx().args.get("ROUTE_ACTION_METHOD");
        String url = (String) ctx().args.get("ROUTE_PATTERN");
        Map<String, String> params = new HashMap<>();
        String[] urlEls = url.split("/");
        String[] pathEls = ctx().request().path().split("/");
        for (int i = 0; i < urlEls.length; i++) {
            String s = urlEls[i];
            if (s.contains("$") || s.contains(":")) {
                //it's a param !!
                params.put("param" + i, s);
            }
        }

        dto.setRequestParams(params);

        String uuid = session("uuid");
        if (uuid == null) {
            uuid = java.util.UUID.randomUUID().toString();
            session("uuid", uuid);
        }
        dto.setSessionId(uuid);


        mongoDBOperator.write(route + "." + action, dto, dtoClass);


        play.Logger.info(request().uri() + ",dto:" + dto);
    }

    private <T extends DTO> void validation(T dto) {

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<T>> validate = validator.validate(dto);
//
        if (validate.size() > 0) {
            String message = "";
            for (ConstraintViolation<T> tConstraintViolation : validate) {

                String messageTranslated = translationService.getTranslation(tConstraintViolation.getMessage(), lang());

                messageTranslated = messageTranslated.replace("{field}", tConstraintViolation.getInvalidValue() + "");

                if (tConstraintViolation.getConstraintDescriptor().getAnnotation() instanceof javax.validation.constraints.Size) {
                    messageTranslated = messageTranslated.replace("{min}", ((javax.validation.constraints.Size) tConstraintViolation.getConstraintDescriptor().getAnnotation()).min() + "");
                    messageTranslated = messageTranslated.replace("{max}", ((javax.validation.constraints.Size) tConstraintViolation.getConstraintDescriptor().getAnnotation()).max() + "");
                }
                message += messageTranslated;
            }

            throw new MyRuntimeException(message);
        }
    }

    protected boolean isMobileDevice() {

        String userAgent = ctx().request().getHeader("User-Agent");
        boolean mobile = false;
        if (userAgent.indexOf("Mobile") != -1) {
            return true;
        }
        return false;
    }

    protected boolean isAndroid() {

        String userAgent = ctx().request().getHeader("User-Agent");
        boolean mobile = false;
        if (userAgent.indexOf("Android") != -1) {
            return true;
        }
        return false;
    }


    protected boolean isAppleDevice() {

        String userAgent = ctx().request().getHeader("User-Agent");
        boolean mobile = false;
        if (userAgent.indexOf("iPhone") != -1 ||
                userAgent.indexOf("iPod") != -1 ||
                userAgent.indexOf("iPad") != -1) {
            return true;
        }
        return false;
    }

    protected BusinessToDisplayDTO convertBusiness(Business business) {

        BusinessToDisplayDTO businessToDisplayDTO = dozerService.map(business, BusinessToDisplayDTO.class);

        //additional data
        if (securityController.isAuthenticated(ctx())) {
            FollowLink followLink = followLinkService.findByAccountAndBusiness(securityController.getCurrentUser(), business);
            if (followLink != null) {
                businessToDisplayDTO.setFollowing(true);
                businessToDisplayDTO.setFollowingFrom(dozerService.map(followLink.getFollowedFrom(), Date.class));
                businessToDisplayDTO.setFollowingNotification(followLink.getFollowingNotification());
            }

        }
        businessToDisplayDTO.setTotalFollowers(followLinkService.countByBusiness(business));

        //order gallery
        Collections.sort(businessToDisplayDTO.getGalleryPictures());

        return businessToDisplayDTO;
    }

    protected List<AbstractPublicationDTO> finalize(Position position, List<AbstractPublication> publications, long t) {

        //compute distance
        List<Business> addresses = new ArrayList<>();
        List<AbstractPublicationDTO> l = new ArrayList<>();

        if (publications.size() > 0) {

            //limit to 20 !
            if (publications.size() > 20) {
                publications = publications.subList(0, 20);
            }


            for (AbstractPublication publication : publications) {
                if (!addresses.contains(publication.getBusiness())) {
                    addresses.add(publication.getBusiness());
                }
            }
            Map<Business, Long> addressLongMap = localizationService.distanceBetweenAddresses(dozerService.map(position, Position.class), addresses);

            for (Map.Entry<Business, Long> addressLongEntry : addressLongMap.entrySet()) {
                for (AbstractPublication publication : publications) {
                    if (addressLongEntry.getKey().equals(publication.getBusiness())) {

                        AbstractPublicationDTO publicationDTO = dozerService.map(publication, AbstractPublicationDTO.class);
                        publicationDTO.setDistance(addressLongEntry.getValue());
                        l.add(publicationDTO);
                        //add business name
                        publicationDTO.setBusinessName(publication.getBusiness().getName());
                        publicationDTO.setBusinessIllustration(dozerService.map(publication.getBusiness().getIllustration(), StoredFileDTO.class));
                        publicationDTO.setBusinessId(publication.getBusiness().getId());
                        //follow ?
                        if (securityController.isAuthenticated(ctx())) {
                            Account account = securityController.getCurrentUser();
                            publicationDTO.setFollowing(followLinkService.testByAccountAndBusiness(account, publication.getBusiness()));

                        }
                        publicationDTO.setTotalFollowers(followLinkService.countByBusiness(publication.getBusiness()));
                    }
                }
            }
        }

        Collections.sort(l);

        return l;//
    }

    protected MyselfDTO accountToMyself(Account account) {

        //build success dto
        MyselfDTO myselfDTO = dozerService.map(account, MyselfDTO.class);
        myselfDTO.setFacebookAccount(account.getFacebookCredential() != null);
        myselfDTO.setLoginAccount(account.getLoginCredential() != null);
        myselfDTO.setAuthenticationKey(account.getAuthenticationKey());
        if (account.getType() != null && account.getType().equals(AccountTypeEnum.BUSINESS)) {
            myselfDTO.setBusinessId(businessService.findByAccount(account).getId());
        }

        return myselfDTO;

    }

}
