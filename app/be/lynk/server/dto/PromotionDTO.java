package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import java.util.Date;

/**
 * Created by florian on 23/05/15.
 */
public class PromotionDTO extends DTO {

    private Long id;

    private String description;

    protected Date startDate;

    protected Date endDate;

    private StoredFileDTO illustration;

    private Double quantity;

    private Double minimalQuantity;

    private String unit;

    private Double originalPrice;

    private Double offPercent;

    private Long distance;

    public Long getDistance() {
        return distance;
    }

    public void setDistance(Long distance) {
        this.distance = distance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public StoredFileDTO getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFileDTO illustration) {
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
        return "PromotionDTO{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", illustration=" + illustration +
                ", quantity=" + quantity +
                ", minimalQuantity=" + minimalQuantity +
                ", unit='" + unit + '\'' +
                ", originalPrice=" + originalPrice +
                ", offPercent=" + offPercent +
                '}';
    }
}
