package be.lynk.server.model.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.util.Set;

/**
 * Created by florian on 17/05/15.
 */
@Entity
public class Customer extends Account {

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "account", orphanRemoval = true)
    private Set<Address> addresses;

    @ManyToMany()
    private Set<CustomerInterest> customerInterests;


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
}
