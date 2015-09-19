package be.lynk.server.dto;

import be.lynk.server.model.PublicationTypeEnum;
import play.modules.mongodb.jackson.KeyTyped;

import java.util.Date;

/**
 * Created by florian on 1/06/15.
 */
public class BusinessNotificationDTO extends AbstractPublicationDTO implements KeyTyped<Date> {
    public BusinessNotificationDTO() {
        type = PublicationTypeEnum.NOTIFICATION;
    }
}
