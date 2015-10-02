package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;


import java.util.Date;

/**
 * Created by florian on 4/08/15.
 */
public class NewAddressDTO extends DTO  {

    private String addressName;

    public String getAddressName() {
        return addressName;
    }

    public void setAddressName(String addressName) {
        this.addressName = addressName;
    }
}
