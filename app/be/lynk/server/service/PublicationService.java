package be.lynk.server.service;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.impl.CrudServiceImpl;

import java.util.List;

/**
 * Created by florian on 5/06/15.
 */
public interface PublicationService extends CrudService<AbstractPublication> {
    List<AbstractPublication> findActivePublication();

    AbstractPublication findLastPublication(Business business);

    <T extends AbstractPublication> List<T> findByTypeAndBusiness(Class<T> promotionClass, Business business);

    List<AbstractPublication> findActivePublicationByBusinesses(List<Business> byAccount);
}
