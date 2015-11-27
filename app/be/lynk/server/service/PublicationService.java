package be.lynk.server.service;

import be.lynk.server.model.Position;
import be.lynk.server.model.SearchResult;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.BusinessNotification;
import be.lynk.server.model.entities.publication.Promotion;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by florian on 5/06/15.
 */
public interface PublicationService extends CrudService<AbstractPublication> {

    List<SearchResult> findActivePublication(Position position, Double maxDistance);

    List<SearchResult> findActivePublicationByBusinesses(Position position,
                                                         Double maxDistance,
                                                         List<Business> businesses);

    List<AbstractPublication> search(String criteria, int page,int max);

    List<SearchResult> findPassedPublicationByBusiness(Business business);

    List<SearchResult> findActivePublicationByBusiness(Business business);

    List<SearchResult> findArchivedPublicationByBusiness(Business byId);

    List<SearchResult> findFuturePublicationByBusiness(Business byId);

    List<SearchResult> findActivePublicationByInterest(Position position, Double maxDistance, CustomerInterest interest);

    List<SearchResult> findActivePublicationByBusinessesAndInterest(Position position, Double maxDistance, List<Business> businesses, CustomerInterest interest);

    List<AbstractPublication> findActiveByIds(List<Long> ids);

    List<AbstractPublication> findBySearchResults(List<SearchResult> searchResults);

    List<AbstractPublication> findByBusinessForTown(Business business, Integer page,Integer maxResult);

    List<AbstractPublication> findActiveNotificationByTypeAndZip(Integer zip, Integer page, Integer maxResult);

    List<AbstractPublication> findActivePromotionByTypeAndZip(Integer zip, Integer page, Integer maxResult);

    int countPublicationForToday(LocalDateTime day,Business business);

    Long countAll();

    Long countActive();

    Long countActiveFrom(LocalDateTime localDateTime);

    int countPublicationForWeek(LocalDateTime startDate, Business business);

    List<SearchResult> findPublicationByBusiness(Business byId);

    Long countByBusiness(Business business);

    Long countActiveByBusiness(Business business);


    List<AbstractPublication> findLastActive(Integer nb);
}
