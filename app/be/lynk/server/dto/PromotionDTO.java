package be.lynk.server.dto;

import be.lynk.server.model.PublicationType;
import play.modules.mongodb.jackson.KeyTyped;

import java.util.Date;

/**
 * Created by florian on 23/05/15.
 */
public class PromotionDTO extends AbstractPublicationDTO implements KeyTyped<Date> {

    private Double quantity;

    private Double minimalQuantity;

    private String unit;

    private Double originalPrice;

    private Double offPercent;

    public PromotionDTO() {
        type= PublicationType.PROMOTION;
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
                super.toString() +
                "quantity=" + quantity +
                ", minimalQuantity=" + minimalQuantity +
                ", unit='" + unit + '\'' +
                ", originalPrice=" + originalPrice +
                ", offPercent=" + offPercent +
                '}';
    }
}
