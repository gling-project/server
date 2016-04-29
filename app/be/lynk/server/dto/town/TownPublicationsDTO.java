package be.lynk.server.dto.town;

import be.lynk.server.dto.BusinessNotificationDTO;
import be.lynk.server.dto.PromotionDTO;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.publication.BusinessNotification;

import java.util.List;

/**
 * Created by florian on 10/11/15.
 */
public class TownPublicationsDTO extends DTO {

    private List<PromotionDTO> promotions;

    private List<BusinessNotificationDTO> notifications;

    public List<PromotionDTO> getPromotions() {
        return promotions;
    }

    public void setPromotions(List<PromotionDTO> promotions) {
        this.promotions = promotions;
    }

    public List<BusinessNotificationDTO> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<BusinessNotificationDTO> notifications) {
        this.notifications = notifications;
    }
}
