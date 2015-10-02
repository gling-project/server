package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;


import java.util.Date;
import java.util.List;

/**
 * Created by florian on 7/06/15.
 */
public class BusinessScheduleDTO extends DTO  {

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
