package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.PublicationService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by florian on 5/06/15.
 */
@Service
public class PublicationServiceImpl extends CrudServiceImpl<AbstractPublication> implements PublicationService{

    @Override
    public List<AbstractPublication> findActivePublication() {

        LocalDateTime now = LocalDateTime.now();

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        cq.select(from);
        cq.where(cb.lessThan(from.get("startDate"), now));
        cq.where(cb.greaterThan(from.get("endDate"), now));
        List<AbstractPublication> resultList = JPA.em().createQuery(cq).getResultList();
        return resultList ;
    }

    @Override
    public AbstractPublication findLastPublication(Business business){
        LocalDateTime now = LocalDateTime.now();
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);

        cq.select(from);
        cq.where(cb.lessThan(from.get("startDate"), now));
        cq.where(cb.greaterThan(from.get("endDate"), now));
        cq.where(cb.equal(from.get("endDate"), now));
        cq.orderBy(cb.desc(from.get("startDate")));
        return JPA.em().createQuery(cq).getSingleResult();
    }

    @Override
    public <T extends AbstractPublication> List<T> findByTypeAndBusiness(Class<T> clazz, Business business) {
        LocalDateTime now = LocalDateTime.now();
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(clazz);
        Root<T> from = cq.from(clazz);

        cq.select(from);
        cq.where(cb.equal(from.get("business"), business));
        return JPA.em().createQuery(cq).getResultList();
    }
}