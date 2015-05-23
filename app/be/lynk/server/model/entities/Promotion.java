package be.lynk.server.model.entities;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by florian on 23/05/15.
 */
@Entity
public class Promotion extends AbstractEntity {

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, optional = false)
    private Business business;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private StoredFile storedFile;

    @Basic(optional = false)
    private String description;

    @Basic(optional = false)
    private Double quantity;

    @Basic
    private String unit;

    @Basic(optional = false)
    private Double minimalQuantity;

    @Basic(optional = false)
    private Double price;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime startDate;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime endDate;

    public Promotion() {
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public StoredFile getStoredFile() {
        return storedFile;
    }

    public void setStoredFile(StoredFile storedFile) {
        this.storedFile = storedFile;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getMinimalQuantity() {
        return minimalQuantity;
    }

    public void setMinimalQuantity(Double minimalQuantity) {
        this.minimalQuantity = minimalQuantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "Promotion{" +
                "storedFile=" + storedFile +
                ", description='" + description + '\'' +
                ", quantity=" + quantity +
                ", unit='" + unit + '\'' +
                ", minimalQuantity=" + minimalQuantity +
                ", price=" + price +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
