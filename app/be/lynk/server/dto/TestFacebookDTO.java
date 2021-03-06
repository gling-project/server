package be.lynk.server.dto;

import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.GenderEnum;


import java.util.Date;

/**
 * Created by florian on 17/05/15.
 */
public class TestFacebookDTO extends DTO  {

    private String userId;

    private String firstname;

    private String lastname;

    private String email;

    private GenderEnum gender;

    private TestFacebookStatusEnum status;

    private MyselfDTO myself;

    private FacebookTokenAccessControlDTO facebookTokenAccessControl;

    public TestFacebookDTO() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

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

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
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
