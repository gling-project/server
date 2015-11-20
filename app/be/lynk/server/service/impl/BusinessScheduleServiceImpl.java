package be.lynk.server.service.impl;

import be.lynk.server.model.AttendanceEnum;
import be.lynk.server.model.entities.BusinessSchedule;
import be.lynk.server.model.entities.BusinessSchedulePart;
import be.lynk.server.service.BusinessScheduleService;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by florian on 8/06/15.
 */
@Service
public class BusinessScheduleServiceImpl extends CrudServiceImpl<BusinessSchedule> implements BusinessScheduleService {


    @Override
    public AttendanceEnum getCurrentAttendance(List<BusinessSchedule> schedules) {
        DayOfWeek dayOfWeek = LocalDateTime.now().getDayOfWeek();
        int minutes = LocalDateTime.now().getHour() * 60 + LocalDateTime.now().getMinute();

        for (BusinessSchedule schedule : schedules) {
            if (schedule.getDayOfWeek().equals(dayOfWeek)) {
                for (BusinessSchedulePart businessSchedulePart : schedule.getParts()) {
                    if (businessSchedulePart.getFrom() < minutes && businessSchedulePart.getTo() > minutes) {
                        return businessSchedulePart.getAttendance();
                    }
                }
            }
        }
        return null;
    }
}
