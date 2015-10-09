package be.lynk.server.service.impl;

import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.FacebookCredential;
import be.lynk.server.service.AccountService;
import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.stereotype.Repository;
import play.db.jpa.JPA;

import javax.persistence.Query;
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
        Account singleResultOrNull = getSingleResultOrNull(cq);
        return singleResultOrNull;

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

    @Override
    public Account findByFacebook(FacebookCredential facebookCredential) {


        String r = "SELECT a FROM Account a where a.facebookCredential=:facebookCredential";

//        String s = "select c from BusinessCategory c where c.translationName = t and v.translation=t and v.lang=:lang and v.searchableContent like :criteria";

        return JPA.em().createQuery(r, Account.class)
                  .setParameter("facebookCredential", facebookCredential)
                  .getSingleResult();

//        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
//        CriteriaQuery<Account> cq = cb.createQuery(Account.class);
//        Root<Account> from = cq.from(Account.class);
//
//        cq.select(from);
//        cq.where(cb.equal(from.get("facebookCredential"), facebookCredential));

//        Account singleResultOrNull = getSingleResultOrNull(facebookCredential1);
//        return singleResultOrNull;

    }


}
