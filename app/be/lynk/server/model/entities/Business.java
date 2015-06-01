package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by florian on 10/11/14.
 */
@Entity
public class Business extends AbstractEntity {


    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true,optional = false)
    private Account account;

    @Basic(optional = false)
    private String name;

    @Basic(optional = false)
    private String description;

    @Basic(optional = false)
    private String phone;

    @OneToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private Address address;

    @ManyToMany
    @JoinTable(
            name = "business_category",
            joinColumns = {@JoinColumn(name = "business")},
            inverseJoinColumns = {@JoinColumn(name = "category")})
    private Set<BusinessCategory> businessCategories;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private StoredFile image;

    @OneToMany(mappedBy = "business",cascade = CascadeType.ALL)
    private Set<Promotion> promotions;

    @OneToMany(mappedBy = "business",cascade = CascadeType.ALL)
    private Set<BusinessNotification> businessNotification;

    public Set<Promotion> getPromotions() {
        return promotions;
    }

    public void setPromotions(Set<Promotion> promotions) {
        this.promotions = promotions;
    }

    public StoredFile getImage() {
        return image;
    }

    public void setImage(StoredFile businessImage) {
        this.image = businessImage;
    }

    public Set<BusinessCategory> getBusinessCategories() {
        return businessCategories;
    }

    public void setBusinessCategories(Set<BusinessCategory> businessCategories) {
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

    public Set<BusinessNotification> getBusinessNotification() {
        return businessNotification;
    }

    public void setBusinessNotification(Set<BusinessNotification> businessNotification) {
        this.businessNotification = businessNotification;
    }

    @Override
    public String toString() {
        return "Business{" +
                "account=" + account +
                ", name='" + name + '\'' +
                ", desc='" + description + '\'' +
                ", phone='" + phone + '\'' +
                ", address=" + address +
                '}';
    }
}
