package be.lynk.server.controller.technical;

import be.lynk.server.controller.technical.security.CommonSecurityController;
import be.lynk.server.dto.post.LoginDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.service.DozerService;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.service.TranslationService;
import be.lynk.server.util.exception.MyRuntimeException;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import be.lynk.server.util.message.ErrorMessageEnum;
import play.mvc.Result;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;


/**
 * Created by florian on 10/11/14.
 */
public abstract class AbstractController extends Controller {

    //controllers
    @Autowired
    protected CommonSecurityController securityController;
    //service
    @Autowired
    protected TranslationService translationService;
    @Autowired
    protected DozerService dozerService;
    @Autowired
    private MongoDBOperator mongoDBOperator;

    /**
     * this function control the dto (via play.validation annotation) and return it if it's valid, or throw a runtimeException with an error message if not.
     */
    protected <T extends DTO> T extractDTOFromRequest(Class<T> DTOclass) {

        //extract the json node
        JsonNode node = request().body().asJson();
        //extract dto
        T dto = DTO.getDTO(node, DTOclass);
        if (dto == null) {
            throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR, DTOclass.getName());
        }

        validation(dto);
        if(securityController.isAuthenticated(ctx())) {
            dto.setCurrentAccountEmail(securityController.getUsername(ctx()));
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
        Logger.info("httpUserAgent:" + userAgent + ", mobile ? " + mobile);
        return mobile;
    }


}
