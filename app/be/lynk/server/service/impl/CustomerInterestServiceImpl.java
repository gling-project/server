package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.service.CustomerInterestService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

/**
 * Created by florian on 17/05/15.
 */
@Service
public class CustomerInterestServiceImpl extends CrudServiceImpl<CustomerInterest> implements CustomerInterestService {
    @Override
    public CustomerInterest findByName(String name) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<CustomerInterest> cq = cb.createQuery(CustomerInterest.class);
        Root<CustomerInterest> from = cq.from(CustomerInterest.class);
        cq.select(from);
        cq.where(cb.equal(from.get("name"), name));
        return getSingleResultOrNull(cq);
    }
}
