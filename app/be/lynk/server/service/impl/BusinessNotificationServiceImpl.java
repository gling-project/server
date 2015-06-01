package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessNotification;
import be.lynk.server.model.entities.Promotion;
import be.lynk.server.service.BusinessNotificationService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by florian on 1/06/15.
 */
@Service
public class BusinessNotificationServiceImpl extends CrudServiceImpl<BusinessNotification> implements BusinessNotificationService {

    @Override
    public List<BusinessNotification> findActiveNotification() {

        LocalDateTime now = LocalDateTime.now();

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<BusinessNotification> cq = cb.createQuery(BusinessNotification.class);
        Root<BusinessNotification> from = cq.from(BusinessNotification.class);
        cq.select(from);
        cq.where(cb.lessThan(from.get("startDate"), now));
        cq.where(cb.greaterThan(from.get("endDate"), now));
        List<BusinessNotification> resultList = JPA.em().createQuery(cq).getResultList();
        return resultList ;
    }
}
