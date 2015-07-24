package be.lynk.server.service;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessCategory;

import java.util.List;

/**
 * Created by florian on 18/05/15.
 */
public interface BusinessService extends CrudService<Business>{
    List<Business> findByName(String businessName);

    List<Business> search(String text,int max);

    List<Business> findByCategory(BusinessCategory businessCategory, int max);
}
