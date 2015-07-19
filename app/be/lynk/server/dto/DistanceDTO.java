package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import play.modules.mongodb.jackson.KeyTyped;

import java.util.Date;

/**
 * Created by florian on 29/06/15.
 */
public class DistanceDTO extends DTO implements KeyTyped<Date> {

    private Long distance;

    public DistanceDTO() {
    }

    public DistanceDTO(Long distance) {
        this.distance = distance;
    }

    public Long getDistance() {
        return distance;
    }

    public void setDistance(Long distance) {
        this.distance = distance;
    }
}
