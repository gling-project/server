package be.lynk.server.service;

import be.lynk.server.model.AttendanceEnum;
import be.lynk.server.model.entities.BusinessSchedule;

import java.util.List;

/**
 * Created by florian on 8/06/15.
 */
public interface BusinessScheduleService extends CrudService<BusinessSchedule> {
    AttendanceEnum getCurrentAttendance(List<BusinessSchedule> schedules);
}
