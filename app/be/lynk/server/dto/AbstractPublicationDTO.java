package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.PublicationType;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by florian on 5/06/15.
 */
public abstract class AbstractPublicationDTO extends DTO implements Comparable<AbstractPublicationDTO> {

    protected Long id;

    protected String description;

    protected Date startDate;

    protected Date endDate;

    private Long distance;

    private String businessName;

    private StoredFileDTO businessIllustration;

    private Long businessId;

    private Boolean following;

    private Integer totalFollowers;

    protected PublicationType type;

    public StoredFileDTO getBusinessIllustration() {
        return businessIllustration;
    }

    public void setBusinessIllustration(StoredFileDTO businessIllustration) {
        this.businessIllustration = businessIllustration;
    }



    private List<StoredFileDTO> pictures=new ArrayList<>();


    public PublicationType getType() {
        return type;
    }

    public void setType(PublicationType type) {
        this.type = type;
    }

    public Integer getTotalFollowers() {
        return totalFollowers;
    }

    public void setTotalFollowers(Integer totalFollowers) {
        this.totalFollowers = totalFollowers;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public Boolean getFollowing() {
        return following;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDistance() {
        return distance;
    }

    public void setDistance(Long distance) {
        this.distance = distance;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<StoredFileDTO> getPictures() {
        return pictures;
    }

    public void setPictures(List<StoredFileDTO> pictures) {
        this.pictures = pictures;
    }

    public void setFollowing(Boolean following) {
        this.following = following;
    }


    @Override
    public int compareTo(AbstractPublicationDTO o) {
        return this.getEndDate().compareTo(o.getEndDate());
    }

    @Override
    public String toString() {
        return "AbstractPublicationDTO{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", distance=" + distance +
                ", businessName='" + businessName + '\'' +
                '}';
    }
}
