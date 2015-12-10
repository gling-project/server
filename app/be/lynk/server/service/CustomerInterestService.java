package be.lynk.server.service;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.CustomerInterest;

import java.util.List;

/**
 * Created by florian on 17/05/15.
 */
public interface CustomerInterestService extends CrudService<CustomerInterest>{
    CustomerInterest findByName(String name);

    void deleteAll();

    List<CustomerInterest> findInterestsByBusiness(Business business);

    List<CustomerInterest> findInterestByBusinessId(Long businessId);
}
