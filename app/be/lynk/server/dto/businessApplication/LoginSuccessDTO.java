package be.lynk.server.dto.businessApplication;


import be.lynk.server.dto.AccountDTO;
import be.lynk.server.dto.BusinessDTO;
import be.lynk.server.dto.technical.DTO;

/**
 * Created by florian on 11/11/14.
 */
public class LoginSuccessDTO extends DTO {


    private AccountDTO account;

    private BusinessDTO business;
    private String      authenticationKey;

    public AccountDTO getAccount() {
        return account;
    }

    public void setAccount(AccountDTO account) {
        this.account = account;
    }

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
}
