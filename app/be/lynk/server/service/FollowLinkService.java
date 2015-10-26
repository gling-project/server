package be.lynk.server.service;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.FollowLink;

import java.util.List;

/**
 * Created by florian on 9/06/15.
 */
public interface FollowLinkService extends CrudService<FollowLink> {

    FollowLink findByAccountAndBusiness(Account customerAccount, Business byId);

    List<FollowLink> findByAccount(Account account);

    Integer countByBusiness(Business business);

    boolean testByAccountAndBusiness(Account customerAccount, Business business);

    List<Business> findBusinessByAccount(Account currentUser);

    long countByAccount(Account account);
}
