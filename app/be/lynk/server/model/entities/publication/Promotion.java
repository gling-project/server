package be.lynk.server.model.entities.publication;

import javax.persistence.Basic;
import javax.persistence.Entity;

/**
 * Created by florian on 23/05/15.
 */
@Entity
public class Promotion extends AbstractPublication{

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
                super.toString()+
                ", quantity=" + quantity +
                ", minimalQuantity=" + minimalQuantity +
                ", unit='" + unit + '\'' +
                ", originalPrice=" + originalPrice +
                ", offPercent=" + offPercent+
                '}';
    }

}
