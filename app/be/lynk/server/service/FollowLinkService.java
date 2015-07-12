package be.lynk.server.service;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerAccount;
import be.lynk.server.model.entities.FollowLink;

import java.util.List;

/**
 * Created by florian on 9/06/15.
 */
public interface FollowLinkService extends CrudService<FollowLink> {

    FollowLink findByAccountAndBusiness(CustomerAccount customerAccount, Business byId);

    List<FollowLink> findByAccount(CustomerAccount account);

    Integer countByBusiness(Business business);

    boolean testByAccountAndBusiness(CustomerAccount customerAccount, Business business);

    List<Business> findBusinessByAccount(CustomerAccount currentUser);
}
