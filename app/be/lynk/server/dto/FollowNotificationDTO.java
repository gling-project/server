package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import play.modules.mongodb.jackson.KeyTyped;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by florian on 6/09/15.
 */
public class FollowNotificationDTO extends DTO  implements KeyTyped<Date> {

    @NotNull
    private Long businessId;

    @NotNull
    private Boolean sendNotification;

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public Boolean getSendNotification() {
        return sendNotification;
    }

    public void setSendNotification(Boolean sendNotification) {
        this.sendNotification = sendNotification;
    }
}
