package be.flo.project.dto;

import be.flo.project.controller.technical.security.role.RoleEnum;
import be.flo.project.dto.technical.DTO;
import be.flo.project.util.constants.ValidationRegex;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Created by florian on 11/11/14.
 */
public class MyselfDTO extends AccountDTO {

    private Boolean loginAccount;

    private Boolean facebookAccount;

    private String authenticationKey;

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
