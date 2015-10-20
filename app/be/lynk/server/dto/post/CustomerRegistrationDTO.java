package be.lynk.server.dto.post;

import be.lynk.server.dto.AddressDTO;
import be.lynk.server.dto.CustomerInterestDTO;
import be.lynk.server.dto.FacebookAuthenticationDTO;
import be.lynk.server.dto.technical.DTO;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Created by florian on 11/11/14.
 */
public class CustomerRegistrationDTO extends DTO   {

    private FacebookAuthenticationDTO facebookAuthentication;

    private AccountRegistrationDTO accountRegistration;
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

    @Override
    public String toString() {
        return "CustomerRegistrationDTO{" +
                "facebookAuthentication=" + facebookAuthentication +
                ", accountRegistration=" + accountRegistration +
                '}';
    }

    public List<CustomerInterestDTO> getCustomerInterests() {
        return customerInterests;
    }

    public void setCustomerInterests(List<CustomerInterestDTO> customerInterests) {
        this.customerInterests = customerInterests;
    }
}
