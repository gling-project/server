package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusAnnotation;
import be.lynk.server.controller.technical.security.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.BusinessScheduleContainerDTO;
import be.lynk.server.dto.BusinessSchedulePartDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessAccount;
import be.lynk.server.model.entities.BusinessSchedule;
import be.lynk.server.model.entities.BusinessSchedulePart;
import be.lynk.server.service.BusinessScheduleService;
import be.lynk.server.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 8/06/15.
 */
@Controller
public class BusinessScheduleRestController extends AbstractRestController {

    @Autowired
    private BusinessScheduleService businessScheduleService;
    @Autowired
    private BusinessService businessService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result createSchedule() {

        BusinessScheduleContainerDTO dto = extractDTOFromRequest(BusinessScheduleContainerDTO.class);

        Business business = ((BusinessAccount) securityController.getCurrentUser()).getBusiness();
        business.setSchedules(new ArrayList<>());


        for (Map.Entry<DayOfWeek, List<BusinessSchedulePartDTO>> dayOfWeekBusinessScheduleDTOEntry : dto.getSchedules().entrySet()) {

            BusinessSchedule businessSchedule = new BusinessSchedule();
            businessSchedule.setDayOfWeek(dayOfWeekBusinessScheduleDTOEntry.getKey());
            businessSchedule.setBusiness(business);
            business.getSchedules().add(businessSchedule);

            List<BusinessSchedulePart> parts = dozerService.map(dayOfWeekBusinessScheduleDTOEntry.getValue(), BusinessSchedulePart.class);
            for (BusinessSchedulePart part : parts) {
                part.setBusinessSchedule(businessSchedule);
                businessSchedule.getParts().add(part);


            }
        }

        businessService.saveOrUpdate(business);
        return ok();
    }
}
