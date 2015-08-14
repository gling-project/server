package be.lynk.server.model.entities;

import javax.persistence.Basic;
import javax.persistence.Embeddable;

/**
 * Created by florian on 14/08/15.
 */
@Embeddable
public class BusinessSocialNetwork {

    @Basic
    private String facebookLink;

    @Basic
    private String twitterLink;

    @Basic
    private String instagramLink;

    @Basic
    private String deliveryLink;

    @Basic
    private String opinionLink;

    @Basic
    private String reservationLink;

    @Basic
    private String ecommerceLink;

    public String getFacebookLink() {
        return facebookLink;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getTwitterLink() {
        return twitterLink;
    }

    public void setTwitterLink(String twitterLink) {
        this.twitterLink = twitterLink;
    }

    public String getInstagramLink() {
        return instagramLink;
    }

    public void setInstagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
    }

    public String getDeliveryLink() {
        return deliveryLink;
    }

    public void setDeliveryLink(String deliveryLink) {
        this.deliveryLink = deliveryLink;
    }

    public String getOpinionLink() {
        return opinionLink;
    }

    public void setOpinionLink(String opinionLink) {
        this.opinionLink = opinionLink;
    }

    public String getReservationLink() {
        return reservationLink;
    }

    public void setReservationLink(String reservationLink) {
        this.reservationLink = reservationLink;
    }

    public String getEcommerceLink() {
        return ecommerceLink;
    }

    public void setEcommerceLink(String ecommerceLink) {
        this.ecommerceLink = ecommerceLink;
    }
}
