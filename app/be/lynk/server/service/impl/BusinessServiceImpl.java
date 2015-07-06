package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.service.BusinessService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

/**
 * Created by florian on 18/05/15.
 */
@Service
public class BusinessServiceImpl extends CrudServiceImpl<Business> implements BusinessService {
    @Override
    public List<Business> findByName(String businessName) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        cq.select(from);
        cq.where(cb.equal(from.get("name"), businessName));
        return JPA.em().createQuery(cq).getResultList();

    }
}
