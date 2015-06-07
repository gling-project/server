package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Created by florian on 6/06/15.
 */
@Entity
public class CategoryInterestLink extends AbstractEntity {

    @Basic(optional = false)
    private Integer priority;

    @ManyToOne(optional = false)
    private BusinessCategory businessCategory;

    @ManyToOne(optional = false)
    private CustomerInterest customerInterest;

    public CategoryInterestLink() {
    }

    public CategoryInterestLink(BusinessCategory businessCategory, CustomerInterest customerInterest, Integer priority) {
        this.businessCategory = businessCategory;
        this.customerInterest = customerInterest;
        this.priority = priority;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public BusinessCategory getBusinessCategory() {
        return businessCategory;
    }

    public void setBusinessCategory(BusinessCategory businessCategory) {
        this.businessCategory = businessCategory;
    }

    public CustomerInterest getCustomerInterest() {
        return customerInterest;
    }

    public void setCustomerInterest(CustomerInterest customerInterest) {
        this.customerInterest = customerInterest;
    }

    @Override
    public String toString() {
        return "CategoryInterestLink{" +
                "businessCategory=" + businessCategory +
                ", customerInterest=" + customerInterest +
                '}';
    }
}
