package be.flo.project.service.impl;

import be.flo.project.model.entities.Account;
import org.jasypt.util.password.StrongPasswordEncryptor;
import be.flo.project.service.AccountService;
import be.flo.project.util.KeyGenerator;
import org.springframework.stereotype.Repository;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

/**
 * Created by florian on 10/11/14.
 */
@Repository
public class AccountServiceImpl extends CrudServiceImpl<Account> implements AccountService {

    @Override
    public Account findByEmail(String email) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Account> cq = cb.createQuery(Account.class);
        Root<Account> from = cq.from(Account.class);
        cq.select(from);
        cq.where(cb.equal(from.get("email"), email));
        return getSingleResultOrNull(cq);
    }

    @Override
    public Account findByAuthenticationKey(String authenticationKey) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Account> cq = cb.createQuery(Account.class);
        Root<Account> from = cq.from(Account.class);
        cq.select(from);
        cq.where(cb.equal(from.get("authenticationKey"), authenticationKey));
        return getSingleResultOrNull(cq);
    }

    @Override
    public boolean controlAuthenticationKey(String authenticationKey, Account account) {
        return !(account.getAuthenticationKey().length() < 40) && account.getAuthenticationKey() != null && new StrongPasswordEncryptor().checkPassword(authenticationKey, account.getAuthenticationKey());
    }

    @Override
    public Integer getCount() {
        return findAll().size();
    }



}
