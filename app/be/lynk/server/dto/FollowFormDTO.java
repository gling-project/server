package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;


import java.util.Date;

/**
 * Created by florian on 10/06/15.
 */
public class FollowFormDTO extends DTO  {
    private Long businessId;

    private Boolean follow;

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public Boolean getFollow() {
        return follow;
    }

    public void setFollow(Boolean follow) {
        this.follow = follow;
    }
}
