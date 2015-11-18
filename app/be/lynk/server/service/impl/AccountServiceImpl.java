package be.lynk.server.service.impl;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.FacebookCredential;
import be.lynk.server.service.AccountService;
import be.lynk.server.util.AccountTypeEnum;
import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.stereotype.Repository;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
        return account.getAuthenticationKey()!=null &&  !(account.getAuthenticationKey().length() < 40) && new StrongPasswordEncryptor().checkPassword(authenticationKey, account.getAuthenticationKey());
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

    @Override
    public Long countByType(AccountTypeEnum accountType) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Account> from = cq.from(Account.class);
        cq.select(cb.count(from));

        if (accountType.equals(AccountTypeEnum.CUSTOMER)) {
            cq.where(cb.or(cb.equal(from.get("type"), accountType),
                    cb.isNull(from.get("type"))));
        } else {
            cq.where(cb.equal(from.get("type"), accountType));
        }
        return JPA.em().createQuery(cq).getSingleResult();
    }

    @Override
    public Long countByTypeFrom(AccountTypeEnum accountType, LocalDateTime localDateTime) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Account> from = cq.from(Account.class);
        cq.select(cb.count(from));

        List<Predicate> predicates = new ArrayList<>();

        if (accountType.equals(AccountTypeEnum.CUSTOMER)) {
            predicates.add(cb.or(cb.equal(from.get("type"), accountType),
                    cb.isNull(from.get("type"))));
        } else {
            predicates.add(cb.equal(from.get("type"), accountType));
        }

        predicates.add(cb.greaterThan(from.get("creationDate"), localDateTime));

        cq.where(predicates.toArray(new Predicate[predicates.size()]));

        return JPA.em().createQuery(cq).getSingleResult();
    }

    @Override
    public List<Account> findByRole(RoleEnum role) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Account> cq = cb.createQuery(Account.class);
        Root<Account> from = cq.from(Account.class);
        cq.select(from);

        if (role.equals(RoleEnum.CUSTOMER)) {
            cq.where(cb.or(cb.isNull(from.get("role")), cb.equal(from.get("role"), role)));
        }
        else{
            cq.where(cb.equal(from.get("role"), role));
        }

        return JPA.em().createQuery(cq).getResultList();
    }


}
