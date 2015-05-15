package be.flo.project.service;

import be.flo.project.model.entities.Account;

/**
 * Created by florian on 6/12/14.
 */
public interface AccountService extends CrudService<Account>{

    Account findByEmail(String email);

    Account findByAuthenticationKey(String authenticationKey);

    boolean controlAuthenticationKey(String authenticationKey, Account account);

    Integer getCount();
}
