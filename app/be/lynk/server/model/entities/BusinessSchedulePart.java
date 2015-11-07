package be.lynk.server.model.entities;

import be.lynk.server.model.AttendanceEnum;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;

/**
 * Created by florian on 7/06/15.
 */
@Entity
public class BusinessSchedulePart extends AbstractEntity{

    @Basic(optional = false)
    @Column(name = "fromMinutes")
    private Integer from;

    @Basic(optional = false)
    @Column(name = "toMinutes")
    private Integer to;

    @Basic(optional = false)
    @Enumerated(value = EnumType.STRING)
    private AttendanceEnum attendance;

    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private BusinessSchedule businessSchedule;

    public BusinessSchedulePart() {
    }

    public BusinessSchedulePart(Integer from, AttendanceEnum attendance, BusinessSchedule businessSchedule) {
        this.from = from;
        this.attendance = attendance;
        this.businessSchedule = businessSchedule;
    }

    public BusinessSchedule getBusinessSchedule() {
        return businessSchedule;
    }

    public void setBusinessSchedule(BusinessSchedule businessSchedule) {
        this.businessSchedule = businessSchedule;
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
