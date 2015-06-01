package be.lynk.server.model.entities;

import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by florian on 1/06/15.
 */
@Entity
public class BusinessNotification extends AbstractEntity {

    @Basic(optional = false)
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Column(columnDefinition = "timestamp")
    private LocalDateTime startDate;

    @Basic(optional = false)
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Column(columnDefinition = "timestamp")
    private LocalDateTime endDate;

    @Basic(optional = false)
    private String description;

    @ManyToOne(optional = true)
    private StoredFile illustration;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, optional = false)
    private Business business;

    public Business getBusiness() {
        return business;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public StoredFile getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFile illustration) {
        this.illustration = illustration;
    }

    @Override
    public String toString() {
        return "BusinessNotification{" +
                "startDate=" + startDate +
                ", endDate=" + endDate +
                ", description='" + description + '\'' +
                ", illustration=" + illustration +
                ", business=" + business +
                '}';
    }
}
