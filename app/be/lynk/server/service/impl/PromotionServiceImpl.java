package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Promotion;
import be.lynk.server.service.PromotionService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by florian on 23/05/15.
 */
@Service
public class PromotionServiceImpl extends CrudServiceImpl<Promotion> implements PromotionService {
    @Override
    public List<Promotion> findActivePromotion() {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Promotion> cq = cb.createQuery(Promotion.class);
        Root<Promotion> from = cq.from(Promotion.class);
        cq.select(from);
        cq.where(cb.greaterThan(from.get("endDate"), LocalDateTime.now()));
        cq.where(cb.lessThan(from.get("startDate"), LocalDateTime.now()));
        return JPA.em().createQuery(cq).getResultList();
    }
}
