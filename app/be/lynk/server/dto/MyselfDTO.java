package be.lynk.server.dto;

/**
 * Created by florian on 11/11/14.
 */
public class MyselfDTO extends AccountDTO {

    private Boolean loginAccount;

    private Boolean facebookAccount;

    private String authenticationKey;

    private BusinessDTO business;

    public BusinessDTO getBusiness() {
        return business;
    }

    public void setBusiness(BusinessDTO business) {
        this.business = business;
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
