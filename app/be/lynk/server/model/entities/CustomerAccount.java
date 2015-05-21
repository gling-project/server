package be.lynk.server.model.entities;

import be.lynk.server.util.AccountTypeEnum;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
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


    public CustomerAccount() {
        type = AccountTypeEnum.CUSTOMER;
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
