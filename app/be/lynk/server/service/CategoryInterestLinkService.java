package be.lynk.server.service;

import be.lynk.server.model.entities.CategoryInterestLink;

/**
 * Created by florian on 6/06/15.
 */
public interface CategoryInterestLinkService extends CrudService<CategoryInterestLink> {
    void deleteAll();
}
