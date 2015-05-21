package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import javax.persistence.Basic;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * Created by florian on 17/05/15.
 */
public class AddressDTO extends DTO{

    private Long id;

    private String name;

    @NotNull
    @Pattern(regexp = ".{2,50}",message = "--.validation.dto.size")
    private String street;

    @NotNull
    @Pattern(regexp = ".{2,50}",message = "--.validation.dto.size")
    private String zip;

    @NotNull
    @Pattern(regexp = ".{2,50}",message = "--.validation.dto.size")
    private String city;

    private String country;

    public AddressDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return "AddressDTO{" +
                "name='" + name + '\'' +
                ", street='" + street + '\'' +
                ", zip='" + zip + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}
