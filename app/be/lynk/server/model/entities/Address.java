package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Created by florian on 17/05/15.
 */
@Entity
public class Address extends AbstractEntity {

    private String name;

    @Basic(optional = false)
    private String street;

    @Basic(optional = false)
    private String zip;

    private String city;

    @Basic(optional = false)
    private String country;

    private Double localisationX;

    private Double localisationY;

    public Address() {
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getLocalisationX() {
        return localisationX;
    }

    public void setLocalisationX(Double localisationX) {
        this.localisationX = localisationX;
    }

    public Double getLocalisationY() {
        return localisationY;
    }

    public void setLocalisationY(Double localisationY) {
        this.localisationY = localisationY;
    }

    @Override
    public String toString() {
        return "Address{" +
                super.toString()+
                "name='" + name + '\'' +
                ", street='" + street + '\'' +
                ", zip='" + zip + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", localisationX=" + localisationX +
                ", localisationY=" + localisationY +
                '}';
    }
}
