package be.lynk.server.dto.post;

import be.lynk.server.dto.AddressDTO;
import be.lynk.server.dto.BusinessDTO;
import be.lynk.server.dto.CustomerInterestDTO;
import be.lynk.server.dto.FacebookAuthenticationDTO;
import be.lynk.server.dto.technical.DTO;
import play.modules.mongodb.jackson.KeyTyped;

import java.util.Date;
import java.util.List;


/**
 * Created by florian on 11/11/14.
 */
public class BusinessRegistrationDTO extends DTO implements KeyTyped<Date> {

    private FacebookAuthenticationDTO facebookAuthentication;

    private AccountRegistrationDTO accountRegistration;

    private BusinessDTO business;

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

    public BusinessDTO getBusiness() {
        return business;
    }

    public void setBusiness(BusinessDTO business) {
        this.business = business;
    }

    @Override
    public String toString() {
        return "BusinessRegistrationDTO{" +
                "facebookAuthentication=" + facebookAuthentication +
                ", accountRegistration=" + accountRegistration +
                ", business=" + business +
                '}';
    }
}
