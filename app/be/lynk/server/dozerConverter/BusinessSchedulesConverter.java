package be.lynk.server.dozerConverter;

import be.lynk.server.dto.BusinessSchedulePartDTO;
import be.lynk.server.model.entities.BusinessSchedule;
import be.lynk.server.model.entities.BusinessSchedulePart;
import be.lynk.server.service.DozerService;
import be.lynk.server.service.impl.DozerServiceImpl;
import org.dozer.CustomConverter;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 13/06/15.
 */
public class BusinessSchedulesConverter implements CustomConverter{

    private DozerService dozerService = new DozerServiceImpl();

    public Object convert(Object destination, Object source,
                          Class destClass, Class sourceClass) {

        if (source instanceof List) {
            List<BusinessSchedule> list = (List<BusinessSchedule>) source;

            Map<DayOfWeek, List<BusinessSchedulePartDTO>> map = new HashMap<>();
            for (BusinessSchedule businessSchedule : list) {
                List<BusinessSchedulePartDTO> listDTO = new ArrayList<>();
                for (BusinessSchedulePart businessSchedulePart : businessSchedule.getParts()) {
                    listDTO.add(dozerService.map(businessSchedulePart, BusinessSchedulePartDTO.class));
                }
                map.put(businessSchedule.getDayOfWeek(), listDTO);
            }
            return map;

        } else {
            return null;
        }
    }
}