package be.lynk.server.model.entities;

import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by florian on 23/05/15.
 */
@Entity
public class Promotion extends AbstractEntity implements Comparable<Promotion>{

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, optional = false)
    private Business business;

    @Basic(optional = false)
    private String description;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime startDate;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime endDate;

    @ManyToOne
    private StoredFile illustration;

    @Basic
    private Double quantity;

    @Basic
    private Double minimalQuantity;

    @Basic
    private String unit;

    @Basic
    private Double originalPrice;

    @Basic
    private Double offPercent;

    public Promotion() {
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public StoredFile getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFile illustration) {
        this.illustration = illustration;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Double getMinimalQuantity() {
        return minimalQuantity;
    }

    public void setMinimalQuantity(Double minimalQuantity) {
        this.minimalQuantity = minimalQuantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Double getOffPercent() {
        return offPercent;
    }

    public void setOffPercent(Double offPercent) {
        this.offPercent = offPercent;
    }

    @Override
    public String toString() {
        return "Promotion{" +
                "business=" + business +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", illustration=" + illustration +
                ", quantity=" + quantity +
                ", minimalQuantity=" + minimalQuantity +
                ", unit='" + unit + '\'' +
                ", originalPrice=" + originalPrice +
                ", offPercent=" + offPercent+
                '}';
    }


    @Override
    public int compareTo(Promotion o) {
        return o.getCreationDate().compareTo(this.getCreationDate());
    }
}
