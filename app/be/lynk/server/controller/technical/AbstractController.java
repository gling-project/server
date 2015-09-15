package be.lynk.server.controller.technical;

import be.lynk.server.controller.technical.security.CommonSecurityController;
import be.lynk.server.dto.AbstractPublicationDTO;
import be.lynk.server.dto.BusinessToDisplayDTO;
import be.lynk.server.dto.StoredFileDTO;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.FollowLink;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.service.DozerService;
import be.lynk.server.service.FollowLinkService;
import be.lynk.server.service.LocalizationService;
import be.lynk.server.service.TranslationService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import play.libs.Json;
import play.mvc.Controller;

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

    /**
     * this function control the dto (via play.validation annotation) and return it if it's valid, or throw a runtimeException with an error message if not.
     */
    protected <T extends DTO> T extractDTOFromRequest(Class<T> DTOclass) {
        return extractDTOFromRequest(DTOclass, false);
    }

    protected <T extends DTO> T extractDTOFromRequest(Class<T> DTOclass, boolean nullable) {

        //extract the json node
        JsonNode node = request().body().asJson();
        //extract dto
        T dto = DTO.getDTO(node, DTOclass);
        if (dto == null) {
            if (nullable) {
                return null;
            }
            throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR, DTOclass.getName());
        }

        validation(dto);
        if (securityController.isAuthenticated(ctx())) {
            dto.setCurrentAccountId(securityController.getCurrentUser().getId());
        }
        mongoDBOperator.write(dto, DTOclass);

        return dto;
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

    protected <T extends DTO> List<T> extractList(Class<T> classExpected) {
        List<T> resultList = new ArrayList<>();
        JsonNode parse = request().body().asJson();//Json.parse(new String(contentAsBytes(result)));
        JsonNode list = parse.get("list");
        Iterator<JsonNode> elements = list.elements();
        while (elements.hasNext()) {
            T item = Json.fromJson(elements.next(), classExpected);
            validation(item);
            resultList.add(item);
        }


        return resultList;
    }

    protected boolean isMobileDevice() {

        String userAgent = ctx().request().getHeader("User-Agent");
        boolean mobile = false;
        if (userAgent.indexOf("Mobile") != -1) {
            mobile = true;
        }
        return mobile;
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

}
