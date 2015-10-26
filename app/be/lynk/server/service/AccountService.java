package be.lynk.server.service;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.FacebookCredential;
import be.lynk.server.util.AccountTypeEnum;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by florian on 6/12/14.
 */
public interface AccountService extends CrudService<Account>{

    Account findByEmail(String email);

    Account findByAuthenticationKey(String authenticationKey);

    boolean controlAuthenticationKey(String authenticationKey, Account account);

    Integer getCount();

    Account findByFacebook(FacebookCredential facebookCredential);

    Long countByType(AccountTypeEnum customer);

    Long countByTypeFrom(AccountTypeEnum accountType, LocalDateTime localDateTime);

    List<Account> findByRole(RoleEnum customer);
}
