package be.lynk.server.service;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.CustomerInterest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 18/05/15.
 */
public interface BusinessService extends CrudService<Business> {
    List<Business> findByName(String businessName);

    List<Business> search(String text, int page, int max);

    List<Business> findByCategory(BusinessCategory businessCategory, int maxResult);

    List<Business> findByCategory(BusinessCategory businessCategory, int page, int maxResult);

    List<Business> findByZipAndDeepSearch(String zip, String search, int page, int maxResult);

    List<Business> findByZip(String zip, int page, int maxResult);

    List<Business> findByDistance(Position position, int maxDistance);

    Set<Business> findByDistanceAndCategories(Position position, List<BusinessCategory> categories, int maxDistance);

    List<Business> findByFollowed(Account currentUser);

    Business findByAccount(Account account);

    Long countAll();

    long countByStatus(BusinessStatusEnum published);

    long countAtLeastOneActivePublication();

    long countAtLeastOnePublication();

    long countAtLeastOnePublicationFrom(LocalDateTime localDateTime);

    List<Business> findByStatus(BusinessStatusEnum businessStatus);

    List<Business> findLastPublished(int nb);
}
