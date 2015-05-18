package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;

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
