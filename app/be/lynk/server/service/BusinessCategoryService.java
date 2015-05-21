package be.lynk.server.service;

import be.lynk.server.model.entities.BusinessCategory;

import java.util.List;

/**
 * Created by florian on 18/05/15.
 */
public interface BusinessCategoryService extends CrudService<BusinessCategory>{
    List<BusinessCategory> findAllParent();

    BusinessCategory findByName(String name);
}
