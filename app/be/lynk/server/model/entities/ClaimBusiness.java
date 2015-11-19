package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Created by florian on 18/11/15.
 */
@Entity
public class ClaimBusiness extends AbstractEntity{

    @ManyToOne(optional = false)
    private Business business;

    @ManyToOne(optional = false)
    private Account account;

    @Basic
    private String phone;

    @Basic
    private String vta;

    public ClaimBusiness() {
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getVta() {
        return vta;
    }

    public void setVta(String vta) {
        this.vta = vta;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
