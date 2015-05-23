package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by florian on 23/05/15.
 */
public class PromotionDTO extends DTO {

    private Long id;

    private BusinessDTO business;

    private StoredFileDTO storedFile;

    @NotNull
    @Size(min = 1,max = 50,message = "--.validation.dto.size")
    private String description;

    @NotNull
    private Double quantity;

    private String unit;

    private Double minimalQuantity = 1.0;

    @NotNull
    private Double price;

    @NotNull
    protected Date startDate;

    @NotNull
    protected Date endDate;

    public PromotionDTO() {
    }

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

    public StoredFileDTO getStoredFile() {
        return storedFile;
    }

    public void setStoredFile(StoredFileDTO storedFile) {
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
