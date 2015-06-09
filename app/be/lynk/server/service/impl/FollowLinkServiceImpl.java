package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerAccount;
import be.lynk.server.model.entities.FollowLink;
import be.lynk.server.service.FollowLinkService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

/**
 * Created by florian on 9/06/15.
 */
@Service
public class FollowLinkServiceImpl extends CrudServiceImpl<FollowLink> implements FollowLinkService {

    @Override
    public FollowLink findByAccountAndBusiness(CustomerAccount customerAccount, Business business) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<FollowLink> cq = cb.createQuery(FollowLink.class);
        Root<FollowLink> from = cq.from(FollowLink.class);
        cq.select(from);
        cq.where(cb.equal(from.get("business"), business));
        cq.where(cb.equal(from.get("account"), customerAccount));
        return getSingleResultOrNull(cq);
    }

    @Override
    public List<FollowLink> findByAccount(CustomerAccount account) {
        return null;
    }

    @Override
    public Integer countByBusiness(Business business) {
        return null;
    }
}
