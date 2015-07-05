package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.util.List;

/**
 * Created by florian on 7/06/15.
 */
public class BusinessScheduleDTO extends DTO {

    private List<BusinessSchedulePartDTO> parts;

    public List<BusinessSchedulePartDTO> getParts() {
        return parts;
    }

    public void setParts(List<BusinessSchedulePartDTO> parts) {
        this.parts = parts;
    }

    @Override
    public String toString() {
        return "BusinessSchedule{" +
                "parts=" + parts +
                '}';
    }
}
