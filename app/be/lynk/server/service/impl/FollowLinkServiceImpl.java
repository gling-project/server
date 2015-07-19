package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.FollowLink;
import be.lynk.server.service.FollowLinkService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 9/06/15.
 */
@Service
public class FollowLinkServiceImpl extends CrudServiceImpl<FollowLink> implements FollowLinkService {

    @Override
    public FollowLink findByAccountAndBusiness(Account customerAccount, Business business) {

        String request = "select f from FollowLink f where business = :business and account=:account";
        List<FollowLink> resultList = JPA.em().createQuery(request, FollowLink.class)
                .setParameter("business", business)
                .setParameter("account", customerAccount)
                .getResultList();
        if(resultList.size()==0){
            return null;
        }
        if(resultList.size()>1){
            throw new RuntimeException();
        }
        return resultList.get(0);
    }

    @Override
    public List<FollowLink> findByAccount(Account account) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<FollowLink> cq = cb.createQuery(FollowLink.class);
        Root<FollowLink> from = cq.from(FollowLink.class);
        cq.select(from);
        cq.where(cb.equal(from.get("account"), account));
        return JPA.em().createQuery(cq).getResultList();
    }

    @Override
    public Integer countByBusiness(Business business) {
        return JPA.em().createQuery("select count(f) from FollowLink f where f.business=:business",Long.class)
                .setParameter("business", business)
                .getSingleResult().intValue();
    }

    @Override
    public boolean testByAccountAndBusiness(Account customerAccount, Business business) {
//        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
//        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
//        Root<FollowLink> from = cq.from(FollowLink.class);
//        cq.select(cb.count(cq.from(FollowLink.class)));
//        cq.where(cb.equal(from.get("business"), business));
//        cq.where(cb.equal(from.get("account"), customerAccount));
        return JPA.em().createQuery("select count(f) from FollowLink f where f.business=:business and f.account=:account",Long.class)
                .setParameter("business", business)
                .setParameter("account",customerAccount)
                .getSingleResult()>0;
    }

    @Override
    public List<Business> findBusinessByAccount(Account account) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<FollowLink> cq = cb.createQuery(FollowLink.class);
        Root<FollowLink> from = cq.from(FollowLink.class);
        cq.select(from);
        cq.where(cb.equal(from.get("account"), account));
        List<FollowLink> resultList = JPA.em().createQuery(cq).getResultList();

        List<Business> l = new ArrayList<>();

        for (FollowLink followLink : resultList) {
            l.add(followLink.getBusiness());
        }


        return l;
    }
}
