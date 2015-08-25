package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 7/06/15.
 */
@Entity
public class BusinessSchedule extends AbstractEntity {

    @OneToMany(mappedBy = "businessSchedule",cascade = CascadeType.ALL)
    private List<BusinessSchedulePart> parts = new ArrayList<>();

    @Basic(optional = false)
    @Enumerated(value = EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @ManyToOne(fetch = FetchType.LAZY)
    private Business business;

    public List<BusinessSchedulePart> getParts() {
        return parts;
    }

    public void setParts(List<BusinessSchedulePart> parts) {
        this.parts = parts;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    @Override
    public String toString() {
        return "BusinessSchedule{" +
                "parts=" + parts +
                ", dayOfWeek=" + dayOfWeek +
                ", business=" + business +
                '}';
    }
}
