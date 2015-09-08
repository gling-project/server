package be.lynk.server.service.impl;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.service.BusinessService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
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

    @Override
    public List<Business> search(String criteria, int page, int maxResult) {

        criteria = normalizeForSearch(criteria);

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        cq.select(from);
        cq.where(cb.like(from.get("searchableName"), criteria),
                 cb.equal(from.get("businessStatus"), BusinessStatus.PUBLISHED));

        cq.orderBy(cb.asc(from.get("searchableName")));

        return JPA.em().createQuery(cq)
                  .setFirstResult(page * maxResult)
                  .setMaxResults(maxResult)
                  .getResultList();
    }

    @Override
    public List<Business> findByCategory(BusinessCategory businessCategory, int maxResult) {
        return findByCategory(businessCategory, 0, maxResult);
    }

    @Override
    public List<Business> findByCategory(BusinessCategory businessCategory, int page, int maxResult) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        Join<Business, BusinessCategory> businessCategories = from.join("businessCategories");
        cq.select(from);
        cq.where(cb.equal(businessCategories, businessCategory),
                 cb.equal(from.get("businessStatus"), BusinessStatus.PUBLISHED));

        cq.orderBy(cb.asc(from.get("searchableName")));

        return JPA.em().createQuery(cq)
                  .setFirstResult(page * maxResult)
                  .setMaxResults(maxResult)
                  .getResultList();
    }
}
