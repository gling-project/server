package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.AbstractPublicationDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.dto.PositionDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.PublicationService;
import be.lynk.server.util.constants.Constant;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    public Result getByIds(String idsString) {

        Position position   = extractPosition(initialization(PositionDTO.class));

        List<Long> ids = new ArrayList<>();

        for (String s : idsString.split(",")) {
            ids.add(Long.parseLong(s));
        }

        List<AbstractPublication> abstractPublications = publicationService.findActiveByIds(ids);

        List<AbstractPublicationDTO> publicationDTOs = convertPublicationToDTO(position, abstractPublications, SearchRestController.SortEnum.DATE);

        return ok(new ListDTO<>(publicationDTOs));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result delete(Long id) {

        initialization();

        AbstractPublication publication = publicationService.findById(id);

        //control business
        Business business = publication.getBusiness();

        if (!securityController.getCurrentUser().getRole().equals(RoleEnum.SUPERADMIN) &&
                !securityController.getCurrentUser().getBusiness().equals(business)) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_NOT_YOUR_BUSINESS);
        }

        publication.setWasRemoved(true);

        publicationService.saveOrUpdate(publication);

        return ok(new ResultDTO());
    }

    private Position extractPosition(PositionDTO dto) {
        Position position;

        if (dto.getX() == null || dto.getY() == null) {
            position = Constant.DEFAULT_POSITION;
        } else {
            position = dozerService.map(dto, Position.class);
        }

        return position;
    }
}
