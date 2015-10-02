package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;


import java.util.Date;

/**
 */
public class BusinessSocialNetworkDTO extends DTO  {


    private String facebookLink;

    private String twitterLink;


    private String instagramLink;


    private String deliveryLink;


    private String opinionLink;


    private String reservationLink;


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
