package be.lynk.server.model.entities;

import be.lynk.server.util.AccountTypeEnum;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by florian on 17/05/15.
 */
@Entity
public class CustomerAccount extends Account {

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Address> addresses = new HashSet<>();

    @ManyToMany()
    private Set<CustomerInterest> customerInterests = new HashSet<>();

    @Basic(optional = false)
    private Boolean sendNotificationByDefault = true;

    public CustomerAccount() {
        type = AccountTypeEnum.CUSTOMER;
    }

    public Boolean getSendNotificationByDefault() {
        return sendNotificationByDefault;
    }

    public void setSendNotificationByDefault(Boolean sendNotificationByDefault) {
        this.sendNotificationByDefault = sendNotificationByDefault;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public Set<CustomerInterest> getCustomerInterests() {
        return customerInterests;
    }

    public void setCustomerInterests(Set<CustomerInterest> customerInterests) {
        this.customerInterests = customerInterests;
    }

    @Override
    public String toString() {
        return "CustomerAccount{" +
                super.toString() +
                "addresses=" + addresses +
                ", customerInterests=" + customerInterests +
                '}';
    }
}
