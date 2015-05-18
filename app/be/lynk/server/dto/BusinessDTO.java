package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Address;
import be.lynk.server.model.entities.technical.AbstractEntity;
import be.lynk.server.util.constants.ValidationRegex;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * Created by florian on 10/11/14.
 */
public class BusinessDTO extends DTO {

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2,max =250,message = "--.validation.dto.size")
    private String name;

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2,max =1500,message = "--.validation.dto.size")
    private String description;

    @NotNull(message = "--.validation.dto.notNull")
    @Pattern(regexp = ValidationRegex.PHONE,message = "--.validation.dto.phone")
    private String phone;

    private AddressDTO address;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "BusinessDTO{" +
                "address=" + address +
                ", phone='" + phone + '\'' +
                ", desc='" + description + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
