package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.BusinessService;
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
    @Autowired
    private BusinessService    businessService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result delete(Long id) {

        initialization();

        AbstractPublication publication = publicationService.findById(id);

        //control business
        Business business = publication.getBusiness();

        if(!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !((BusinessAccount)securityController.getCurrentUser()).getBusiness().equals(business)){
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }

        publication.setWasRemoved(true);

        publicationService.saveOrUpdate(publication);

        return ok(new ResultDTO());
    }
}
