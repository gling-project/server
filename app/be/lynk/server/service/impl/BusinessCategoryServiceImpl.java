package be.lynk.server.service.impl;

import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.service.BusinessCategoryService;
import be.lynk.server.service.impl.CrudServiceImpl;
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
public class BusinessCategoryServiceImpl extends CrudServiceImpl<BusinessCategory> implements BusinessCategoryService {

    @Override
    public List<BusinessCategory> findAllParent() {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<BusinessCategory> cq = cb.createQuery(BusinessCategory.class);
        Root<BusinessCategory> from = cq.from(BusinessCategory.class);
        cq.select(from);
        cq.where(cb.isNull(from.get("parent")));
        List<BusinessCategory> resultList = JPA.em().createQuery(cq).getResultList();
        return resultList;
    }

    @Override
    public BusinessCategory findByName(String name) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<BusinessCategory> cq = cb.createQuery(BusinessCategory.class);
        Root<BusinessCategory> from = cq.from(BusinessCategory.class);
        cq.select(from);
        cq.where(cb.equal(from.get("name"), name));
        return getSingleResultOrNull(cq);
    }

    @Override
    public void deleteAll() {
        JPA.em().createQuery("delete from BusinessCategory b").executeUpdate();
    }
}
