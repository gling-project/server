package be.lynk.server.service.impl;

import be.lynk.server.model.entities.*;
import be.lynk.server.service.BusinessCategoryService;
import be.lynk.server.service.CategoryInterestLinkService;
import be.lynk.server.service.CustomerInterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 17/05/15.
 */
@Service
public class CustomerInterestServiceImpl extends CrudServiceImpl<CustomerInterest> implements CustomerInterestService {

    @Autowired
    private CategoryInterestLinkService categoryInterestLinkService;

    @Override
    public CustomerInterest findByName(String name) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<CustomerInterest> cq = cb.createQuery(CustomerInterest.class);
        Root<CustomerInterest> from = cq.from(CustomerInterest.class);
        cq.select(from);
        cq.where(cb.equal(from.get("name"), name));
        return getSingleResultOrNull(cq);
    }

    @Override
    public void deleteAll() {
        JPA.em().createQuery("delete from CustomerInterest c").executeUpdate();
    }

    @Override
    public List<CustomerInterest> findInterestsByBusiness(Business business) {

        if (business.getBusinessCategories() != null && business.getBusinessCategories().size() > 0) {
            return findInterestByBusiness(business);
            //return findInterestByBusinessCategories(business.getBusinessCategories());
        }
        return new ArrayList<>();
    }


    @Override
    public List<CustomerInterest> findInterestByBusinessId(Long businessId) {

        String request = "select c from CustomerInterest c, CategoryInterestLink l, Business b where l.businessCategory member of b.businessCategories and l.customerInterest = c and b.id = :businessId";

        return JPA.em().createQuery(request, CustomerInterest.class)
                .setParameter("businessId", businessId)
                .getResultList();
    }

    public List<CustomerInterest> findInterestByBusiness(Business business) {

        String request = "select c from CustomerInterest c, CategoryInterestLink l, Business b where l.businessCategory member of b.businessCategories and l.customerInterest = c and b = :business";

        return JPA.em().createQuery(request, CustomerInterest.class)
                .setParameter("business", business)
                .getResultList();
    }
}
