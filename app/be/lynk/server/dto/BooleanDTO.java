package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import play.modules.mongodb.jackson.KeyTyped;

import java.util.Date;

/**
 * Created by florian on 17/05/15.
 */
public class BooleanDTO extends DTO implements KeyTyped<Date> {
    private Boolean value;

    public BooleanDTO() {
    }

    public BooleanDTO(Boolean value) {
        this.value = value;
    }

    public Boolean getValue() {
        return value;
    }

    public void setValue(Boolean value) {
        this.value = value;
    }
}
