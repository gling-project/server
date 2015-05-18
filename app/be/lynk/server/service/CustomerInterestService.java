package be.lynk.server.service;

import be.lynk.server.model.entities.CustomerInterest;

/**
 * Created by florian on 17/05/15.
 */
public interface CustomerInterestService extends CrudService<CustomerInterest>{
    CustomerInterest findByName(String name);
}
