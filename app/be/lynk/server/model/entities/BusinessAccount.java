package be.lynk.server.model.entities;

import be.lynk.server.util.AccountTypeEnum;

import javax.persistence.*;

/**
 * Created by florian on 17/05/15.
 */
@Entity
public class BusinessAccount extends Account {

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, optional = false, mappedBy = "account")
    private Business business;

    public BusinessAccount() {
        type = AccountTypeEnum.BUSINESS;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }


    @Override
    public String toString() {
        return "BusinessAccount{" +
                super.toString() +
                '}';
    }
}
