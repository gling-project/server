package be.lynk.server.dto.post;

import be.lynk.server.dto.*;
import be.lynk.server.dto.technical.DTO;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by florian on 11/11/14.
 */
public class CustomerRegistrationDTO extends DTO {

    private FacebookAuthenticationDTO facebookAuthentication;

    private AccountRegistrationDTO accountRegistration;

    private AddressDTO address;
    private List<CustomerInterestDTO> customerInterests = new ArrayList<>();


    public FacebookAuthenticationDTO getFacebookAuthentication() {
        return facebookAuthentication;
    }

    public void setFacebookAuthentication(FacebookAuthenticationDTO facebookAuthentication) {
        this.facebookAuthentication = facebookAuthentication;
    }

    public AccountRegistrationDTO getAccountRegistration() {
        return accountRegistration;
    }

    public void setAccountRegistration(AccountRegistrationDTO accountRegistration) {
        this.accountRegistration = accountRegistration;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "CustomerRegistrationDTO{" +
                "facebookAuthentication=" + facebookAuthentication +
                ", accountRegistration=" + accountRegistration +
                ", address=" + address +
                '}';
    }

    public List<CustomerInterestDTO> getCustomerInterests() {
        return customerInterests;
    }

    public void setCustomerInterests(List<CustomerInterestDTO> customerInterests) {
        this.customerInterests = customerInterests;
    }
}
