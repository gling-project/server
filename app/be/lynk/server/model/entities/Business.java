package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 10/11/14.
 */
@Entity
public class Business extends AbstractEntity {


    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, optional = false)
    private Account account;

    @Basic(optional = false)
    private String name;

    @Basic(optional = false)
    private String description;

    @Basic(optional = false)
    private String phone;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Address address;

    @ManyToMany
    @JoinTable(
            name = "business_category",
            joinColumns = {@JoinColumn(name = "business")},
            inverseJoinColumns = {@JoinColumn(name = "category")})
    private List<BusinessCategory> businessCategories;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private StoredFile illustration;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL)
    private List<Promotion> promotions;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL)
    private List<BusinessNotification> businessNotification;

    public List<Promotion> getPromotions() {
        return promotions;
    }

    public void setPromotions(List<Promotion> promotions) {
        this.promotions = promotions;
    }

    public StoredFile getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFile illustration) {
        this.illustration = illustration;
    }

    public List<BusinessCategory> getBusinessCategories() {
        return businessCategories;
    }

    public void setBusinessCategories(List<BusinessCategory> businessCategories) {
        this.businessCategories = businessCategories;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String desc) {
        this.description = desc;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<BusinessNotification> getBusinessNotification() {
        return businessNotification;
    }

    public void setBusinessNotification(List<BusinessNotification> businessNotification) {
        this.businessNotification = businessNotification;
    }

    @Override
    public String toString() {
        return "Business{" +
                "account=" + account +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", phone='" + phone + '\'' +
                ", address=" + address +
                ", businessCategories=" + businessCategories +
                ", illustration=" + illustration +
                ", promotions=" + promotions +
                ", businessNotification=" + businessNotification +
                '}';
    }
}
