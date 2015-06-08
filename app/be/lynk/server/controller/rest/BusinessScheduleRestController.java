package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.BusinessScheduleDTO;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.BusinessSchedule;
import be.lynk.server.model.entities.BusinessSchedulePart;
import be.lynk.server.service.BusinessScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.time.DayOfWeek;

/**
 * Created by florian on 8/06/15.
 */
@Controller
public class BusinessScheduleRestController extends AbstractRestController {

    @Autowired
    private BusinessScheduleService businessScheduleService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result createSchedule() {

        BusinessScheduleDTO dto = extractDTOFromRequest(BusinessScheduleDTO.class);

        BusinessSchedule businessSchedule = dozerService.map(dto,BusinessSchedule.class);

        businessSchedule.setBusiness(((BusinessAccount)securityController.getCurrentUser()).getBusiness());
        //TODO TMP
        businessSchedule.setDayOfWeek(DayOfWeek.MONDAY);

        for (BusinessSchedulePart businessSchedulePart : businessSchedule.getParts()) {
            businessSchedulePart.setBusinessSchedule(businessSchedule);
        }


        businessScheduleService.saveOrUpdate(businessSchedule);

        return ok();
    }
}
