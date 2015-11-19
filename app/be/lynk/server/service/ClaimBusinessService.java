package be.lynk.server.service;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.ClaimBusiness;

import java.util.List;

/**
 * Created by florian on 19/11/15.
 */
public interface ClaimBusinessService extends CrudService<ClaimBusiness> {

    ClaimBusiness findByAccount(Account account);

    ClaimBusiness findByBusiness(Business business);

    List<ClaimBusiness> findAll();

    Long findBusinessIdByAccount(Account account);
}
