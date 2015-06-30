package be.lynk.server.dto;

import be.lynk.server.model.entities.Address;
import be.lynk.server.model.entities.CustomerInterest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 11/11/14.
 */
public class MyselfDTO extends AccountDTO {

    private Boolean loginAccount;

    private Boolean facebookAccount;

    private String authenticationKey;

    private Long businessId;

    private List<AddressDTO> addresses;

    private Set<CustomerInterestDTO> customerInterests = new HashSet<>();

    public MyselfDTO() {
    }

    public Set<CustomerInterestDTO> getCustomerInterests() {
        return customerInterests;
    }

    public void setCustomerInterests(Set<CustomerInterestDTO> customerInterests) {
        this.customerInterests = customerInterests;
    }

    public List<AddressDTO> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<AddressDTO> addresses) {
        this.addresses = addresses;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public String getAuthenticationKey() {
        return authenticationKey;
    }

    public void setAuthenticationKey(String authenticationKey) {
        this.authenticationKey = authenticationKey;
    }

    public Boolean getLoginAccount() {
        return loginAccount;
    }

    public void setLoginAccount(Boolean loginAccount) {
        this.loginAccount = loginAccount;
    }

    public Boolean getFacebookAccount() {
        return facebookAccount;
    }

    public void setFacebookAccount(Boolean facebookAccount) {
        this.facebookAccount = facebookAccount;
    }
}
