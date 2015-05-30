package be.lynk.server.dto;

import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.dto.technical.DTO;

/**
 * Created by florian on 17/05/15.
 */
public class TestFacebookDTO extends DTO{

    private String firstname;

    private String lastname;

    private String email;

    private Boolean male;

    private TestFacebookStatusEnum status;

    private MyselfDTO myself;

    private AccountFusionDTO accountFusion;
    private FacebookTokenAccessControlDTO facebookTokenAccessControl;

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getMale() {
        return male;
    }

    public void setMale(Boolean male) {
        this.male = male;
    }

    public TestFacebookStatusEnum getStatus() {
        return status;
    }

    public void setStatus(TestFacebookStatusEnum status) {
        this.status = status;
    }

    public MyselfDTO getMyself() {
        return myself;
    }

    public void setMyself(MyselfDTO myself) {
        this.myself = myself;
    }

    public void setAccountFusion(AccountFusionDTO accountFusion) {
        this.accountFusion = accountFusion;
    }

    public AccountFusionDTO getAccountFusion() {
        return accountFusion;
    }

    public void setFacebookTokenAccessControl(FacebookTokenAccessControlDTO facebookTokenAccessControl) {
        this.facebookTokenAccessControl = facebookTokenAccessControl;
    }

    public FacebookTokenAccessControlDTO getFacebookTokenAccessControl() {
        return facebookTokenAccessControl;
    }


    public static enum TestFacebookStatusEnum{
        ALREADY_REGISTRERED,
        ACCOUNT_WITH_SAME_EMAIL,
        OK

    }
}
