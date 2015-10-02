package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;


import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by florian on 9/06/15.
 */
public class FollowDTO extends DTO  {

    private String businessName;

    @NotNull
    private Long businessId;

    private Boolean notification;

    public FollowDTO() {
    }

    public String getBusinessName() {
        return businessName;
    }

    public FollowDTO(String businessName, Long businessId, Boolean notification) {
        this.businessName = businessName;
        this.businessId = businessId;
        this.notification = notification;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public Boolean getNotification() {
        return notification;
    }

    public void setNotification(Boolean notification) {
        this.notification = notification;
    }

    @Override
    public String toString() {
        return "FollowDTO{" +
                "businessName='" + businessName + '\'' +
                ", notification=" + notification +
                '}';
    }
}
