package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.ClaimBusiness;
import be.lynk.server.service.ClaimBusinessService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

/**
 * Created by florian on 19/11/15.
 */
@Service
public class ClaimBusinessServiceImpl extends CrudServiceImpl<ClaimBusiness> implements ClaimBusinessService {

    @Override
    public ClaimBusiness findByAccount(Account account) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<ClaimBusiness> cq = cb.createQuery(ClaimBusiness.class);
        Root<ClaimBusiness> from = cq.from(ClaimBusiness.class);
        cq.select(from);
        cq.where(cb.equal(from.get("account"), account));
        return getSingleResultOrNull(cq);
    }

    @Override
    public List<ClaimBusiness> findByBusiness(Business business) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<ClaimBusiness> cq = cb.createQuery(ClaimBusiness.class);
        Root<ClaimBusiness> from = cq.from(ClaimBusiness.class);
        cq.select(from);
        cq.where(cb.equal(from.get("business"), business));
        return JPA.em().createQuery(cq).getResultList();
    }

    @Override
    public Long findBusinessIdByAccount(Account account) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<ClaimBusiness> cq = cb.createQuery(ClaimBusiness.class);
        Root<ClaimBusiness> from = cq.from(ClaimBusiness.class);
        cq.select(from);
        cq.where(cb.equal(from.get("account"), account));
        ClaimBusiness singleResultOrNull = getSingleResultOrNull(cq);

        if(singleResultOrNull!=null){
            return singleResultOrNull.getBusiness().getId();
        }
        return null;
    }

    @Override
    public ClaimBusiness findByBusinessAndAccount(Business business, Account account) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<ClaimBusiness> cq = cb.createQuery(ClaimBusiness.class);
        Root<ClaimBusiness> from = cq.from(ClaimBusiness.class);
        cq.select(from);
        cq.where(cb.equal(from.get("account"), account),
                cb.equal(from.get("business"), business));
        return getSingleResultOrNull(cq);
    }

    @Override
    public Boolean isClaimed(Business business) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<ClaimBusiness> from = cq.from(ClaimBusiness.class);
        cq.select(cb.count(from));
        cq.where(cb.equal(from.get("business"), business));
        return JPA.em().createQuery(cq).getSingleResult()>0;
    }

    @Override
    public void removeByBusiness(Business business) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaDelete<ClaimBusiness> cq = cb.createCriteriaDelete(ClaimBusiness.class);
        Root<ClaimBusiness> from = cq.from(ClaimBusiness.class);
        cq.where(cb.equal(from.get("business"), business));
        JPA.em().createQuery(cq).executeUpdate();
    }
}
