package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerAccount;
import be.lynk.server.model.entities.FollowLink;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.FollowLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.mvc.Result;

import javax.transaction.Transactional;

/**
 * Created by florian on 9/06/15.
 */
@Controller
public class FollowController extends AbstractRestController {

    @Autowired
    private BusinessService businessService;
    @Autowired
    private FollowLinkService followLinkService;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result followBusiness(Long id) {
        Business byId = businessService.findById(id);
        CustomerAccount customerAccount = (CustomerAccount) securityController.getCurrentUser();

        //control
        if (followLinkService.findByAccountAndBusiness(customerAccount, byId) == null) {
            FollowLink followLink = new FollowLink(byId, customerAccount);
            followLinkService.saveOrUpdate(followLink);
        }

        return ok();
    }

}
