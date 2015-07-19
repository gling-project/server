package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Created by florian on 9/06/15.
 */
@Entity
public class FollowLink extends AbstractEntity{

    @ManyToOne(optional = false)
    private Business business;

    @ManyToOne(optional = false)
    private Account account;

    @Basic
    private Boolean notification;

    public FollowLink() {
    }

    public FollowLink(Business business, Account account) {
        this.business = business;
        this.account = account;
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

    public Boolean getNotification() {
        return notification;
    }

    public void setNotification(Boolean notification) {
        this.notification = notification;
    }
}
