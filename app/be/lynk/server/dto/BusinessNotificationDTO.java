package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.PublicationType;
import be.lynk.server.model.entities.StoredFile;
import play.modules.mongodb.jackson.KeyTyped;

import javax.persistence.Basic;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by florian on 1/06/15.
 */
public class BusinessNotificationDTO extends AbstractPublicationDTO implements KeyTyped<Date> {
    public BusinessNotificationDTO() {
        type = PublicationType.NOTIFICATION;
    }
}
