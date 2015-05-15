package be.flo.project.dto;

import be.flo.project.dto.technical.DTO;

/**
 * Created by florian on 10/05/15.
 */
public class AccountFusionDTO extends DTO {

    private String email;

    private String facebookToken;

    private String password;
    private String facebookUserId;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacebookToken() {
        return facebookToken;
    }

    public void setFacebookToken(String facebookToken) {
        this.facebookToken = facebookToken;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AccountFusionDTO{" +
                "email='" + email + '\'' +
                ", facebookToken='" + facebookToken + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public String getFacebookUserId() {
        return facebookUserId;
    }

    public void setFacebookUserId(String facebookUserId) {
        this.facebookUserId = facebookUserId;
    }
}
