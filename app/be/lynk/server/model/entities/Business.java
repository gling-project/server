package be.lynk.server.model.entities;

import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @Basic
    private String website;

    @Basic
    private String email;

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

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private StoredFile landscape;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL)
    private List<AbstractPublication> publications;

    @OneToMany(mappedBy = "business",cascade = CascadeType.ALL)
    private List<BusinessSchedule> schedules = new ArrayList<>();

    public List<BusinessSchedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<BusinessSchedule> businessSchedules) {
        this.schedules = businessSchedules;
    }

    public StoredFile getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFile illustration) {
        this.illustration = illustration;
    }

    public StoredFile getLandscape() {
        return landscape;
    }

    public void setLandscape(StoredFile landscape) {
        this.landscape = landscape;
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

    public List<AbstractPublication> getPublications() {
        return publications;
    }

    public void setPublications(List<AbstractPublication> publications) {
        this.publications = publications;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
                ", publications=" + publications +
                '}';
    }
}
