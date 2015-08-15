package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.PublicationService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.time.LocalDateTime;

/**
 * Created by florian on 14/08/15.
 */
@Component
public class PublicationRestController extends AbstractRestController {

    @Autowired
    private PublicationService publicationService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result delete(Long id) {
        //load
        AbstractPublication publication = publicationService.findById(id);
        if (publication == null || !publication.getBusiness().equals(((BusinessAccount) securityController.getCurrentUser()).getBusiness())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        publication.setEndDate(LocalDateTime.now());

        publicationService.saveOrUpdate(publication);

        return ok(new ResultDTO());
    }
}