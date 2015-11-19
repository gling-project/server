package be.lynk.server.dto;


import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 11/11/14.
 */
public class MyselfDTO extends AccountDTO {

    private Boolean loginAccount;

    private Boolean facebookAccount;

    private FacebookCredentialDTO facebookCredential;

    private String authenticationKey;

    private Long businessId;

    private List<AddressDTO> addresses;

    private Set<CustomerInterestDTO> customerInterests = new HashSet<>();

    private Long claimedBusinessId;

    public MyselfDTO() {
    }

    public Long getClaimedBusinessId() {
        return claimedBusinessId;
    }

    public void setClaimedBusinessId(Long claimedBusinessId) {
        this.claimedBusinessId = claimedBusinessId;
    }

    public FacebookCredentialDTO getFacebookCredential() {
        return facebookCredential;
    }

    public void setFacebookCredential(FacebookCredentialDTO facebookCredential) {
        this.facebookCredential = facebookCredential;
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
