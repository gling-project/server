package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.AttendanceEnum;


import java.util.Date;

/**
 * Created by florian on 7/06/15.
 */
public class BusinessSchedulePartDTO extends DTO  {

    private Integer from;

    private Integer to;

    private AttendanceEnum attendance;

    public BusinessSchedulePartDTO() {
    }

    public Integer getFrom() {
        return from;
    }

    public void setFrom(Integer from) {
        this.from = from;
    }

    public Integer getTo() {
        return to;
    }

    public void setTo(Integer to) {
        this.to = to;
    }

    public AttendanceEnum getAttendance() {
        return attendance;
    }

    public void setAttendance(AttendanceEnum attendance) {
        this.attendance = attendance;
    }

    @Override
    public String toString() {
        return "BusinessSchedulePart{" +
                "from=" + from +
                ", to=" + to +
                ", attendance=" + attendance +
                '}';
    }
}
