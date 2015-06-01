package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.StoredFile;

import javax.persistence.Basic;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by florian on 1/06/15.
 */
public class BusinessNotificationDTO extends DTO {

    private Long id;

    private BusinessDTO business;

    private Date startDate;

    private String description;

    private StoredFileDTO illustration;

    private Date endDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BusinessDTO getBusiness() {
        return business;
    }

    public void setBusiness(BusinessDTO business) {
        this.business = business;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public StoredFileDTO getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFileDTO illustration) {
        this.illustration = illustration;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "BusinessAnnonceDTO{" +
                "startDate=" + startDate +
                ", description='" + description + '\'' +
                ", illustration=" + illustration+
                '}';
    }
}
