package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.FollowDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerAccount;
import be.lynk.server.model.entities.FollowLink;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.FollowLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.mvc.Result;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public Result followBusiness() {
        FollowDTO dto = extractDTOFromRequest(FollowDTO.class);
        Business byId = businessService.findById(dto.getBusinessId());
        CustomerAccount customerAccount = (CustomerAccount) securityController.getCurrentUser();

        //control
        if (followLinkService.findByAccountAndBusiness(customerAccount, byId) == null) {
            FollowLink followLink = new FollowLink(byId, customerAccount);
            followLinkService.saveOrUpdate(followLink);
        }

        return ok();
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result getMyFollows() {

        List<FollowLink> followLinks = followLinkService.findByAccount((CustomerAccount) securityController.getCurrentUser());

        List<FollowDTO> followDTOs = followLinks.stream().map(followLink ->
                new FollowDTO(followLink.getBusiness().getName(), followLink.getBusiness().getId(), followLink.getNotification())).collect(Collectors.toList()
        );

        return ok(new ListDTO<>(followDTOs));
    }

}
