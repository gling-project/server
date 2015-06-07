package be.lynk.server.service.impl;

import be.lynk.server.model.entities.CategoryInterestLink;
import be.lynk.server.service.CategoryInterestLinkService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

/**
 * Created by florian on 6/06/15.
 */
@Service
public class CategoryInterestLinkServiceImpl extends CrudServiceImpl<CategoryInterestLink> implements CategoryInterestLinkService {
    @Override
    public void deleteAll() {
        JPA.em().createQuery("delete from CategoryInterestLink l").executeUpdate();
    }
}
