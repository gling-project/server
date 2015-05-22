package be.lynk.server.dto;

import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.dto.technical.DTO;

/**
 * Created by florian on 17/05/15.
 */
public class TestFacebookDTO extends DTO{

    private TestFacebookStatusEnum status;

    private MyselfDTO myself;

    private AccountFusionDTO accountFusion;
    private FacebookTokenAccessControlDTO facebookTokenAccessControl;


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
