package be.lynk.server.service.impl;

import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.Translation;
import be.lynk.server.model.entities.TranslationValue;
import be.lynk.server.service.BusinessCategoryService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;
import play.i18n.Lang;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
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

    @Override
    public List<BusinessCategory> search(String criteria, Lang lang) {

        criteria = normalizeForSearch(criteria);

        String s = "select c from BusinessCategory c, Translation t, TranslationValue v where c.translationName = t and v.translation=t and v.lang=:lang and v.searchableContent like :criteria";

        return JPA.em().createQuery(s)
                .setParameter("lang", lang)
                .setParameter("criteria", criteria)
                .getResultList();

//        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
//        CriteriaQuery<BusinessCategory> cq = cb.createQuery(BusinessCategory.class);
//        Root<BusinessCategory> from = cq.from(BusinessCategory.class);
//        Path<Translation> translation = from.get("translationName");
//        Path<TranslationValue> translationValue = translation.get("translationValues");
//        cq.select(from);
//        cq.where(cb.like(translationValue.get("content"), criteria),
//                cb.equal(translationValue.get("lang"), lang));
//        return JPA.em().createQuery(criteria).getResultList();
    }
}
