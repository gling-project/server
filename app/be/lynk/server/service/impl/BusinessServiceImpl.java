package be.lynk.server.service.impl;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Address;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.BusinessService;
import be.lynk.server.util.AccountTypeEnum;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 18/05/15.
 */
@Service
public class BusinessServiceImpl extends CrudServiceImpl<Business> implements BusinessService {

    @Override
    public List<Business> findByName(String businessName) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        cq.select(from);
        cq.where(cb.equal(from.get("name"), businessName),
                cb.equal(from.get("businessStatus"), BusinessStatusEnum.PUBLISHED));
        return JPA.em().createQuery(cq).getResultList();

    }

    @Override
    public List<Business> search(String criteria, int page, int maxResult) {

        criteria = normalizeForSearch(criteria);

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        cq.select(from);
        cq.where(cb.like(from.get("searchableName"), criteria),
                cb.equal(from.get("businessStatus"), BusinessStatusEnum.PUBLISHED));

        cq.orderBy(cb.asc(from.get("searchableName")));

        return JPA.em().createQuery(cq)
                .setFirstResult(page * maxResult)
                .setMaxResults(maxResult)
                .getResultList();
    }

    @Override
    public List<Business> findByCategory(BusinessCategory businessCategory, int maxResult) {
        return findByCategory(businessCategory, 0, maxResult);
    }

    @Override
    public List<Business> findByCategory(BusinessCategory businessCategory, int page, int maxResult) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        Join<Business, BusinessCategory> businessCategories = from.join("businessCategories");
        cq.select(from);
        cq.where(cb.equal(businessCategories, businessCategory),
                cb.equal(from.get("businessStatus"), BusinessStatusEnum.PUBLISHED));

        cq.orderBy(cb.asc(from.get("searchableName")));

        return JPA.em().createQuery(cq)
                .setFirstResult(page * maxResult)
                .setMaxResults(maxResult)
                .getResultList();
    }

    @Override
    public List<Business> findByZipAndDeepSearch(String zip, String criteria, int page, int maxResult) {

//TODO add seach by address and category

        criteria = normalizeForSearch(criteria);

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        Path<Address> addressRel = from.get("address");

        cq.select(from);

        cq.where(cb.equal(addressRel.get("zip"), zip),
                cb.like(from.get("searchableName"), criteria),
                cb.equal(from.get("businessStatus"), BusinessStatusEnum.PUBLISHED));

        cq.orderBy(cb.asc(from.get("searchableName")));

        return JPA.em().createQuery(cq)
                .setFirstResult(page * maxResult)
                .setMaxResults(maxResult)
                .getResultList();
    }

    @Override
    public List<Business> findByZip(String zip, int page, int maxResult) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        Path<Address> addressRel = from.get("address");

        cq.select(from);

        cq.where(cb.equal(addressRel.get("zip"), zip),
                cb.equal(from.get("businessStatus"), BusinessStatusEnum.PUBLISHED));

        cq.orderBy(cb.asc(from.get("searchableName")));

        return JPA.em().createQuery(cq)
                .setFirstResult(page * maxResult)
                .setMaxResults(maxResult)
                .getResultList();
    }

    @Override
    public List<Business> findByDistance(Position position, int maxDistance) {


        double[] maxCoordinate = computeMaxCoordinate(position, maxDistance);

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Business> cq = cb.createQuery(Business.class);
        Root<Business> from = cq.from(Business.class);
        Path<Address> addressRel = from.get("address");

        cq.select(from);

        cq.where(cb.greaterThan(addressRel.get("posx"), maxCoordinate[0]),
                cb.lessThan(addressRel.get("posx"), maxCoordinate[1]),
                cb.greaterThan(addressRel.get("posy"), maxCoordinate[2]),
                cb.lessThan(addressRel.get("posy"), maxCoordinate[3]),
                cb.equal(from.get("businessStatus"), BusinessStatusEnum.PUBLISHED));

        cq.orderBy(cb.asc(from.get("searchableName")));

        return JPA.em().createQuery(cq)
                .getResultList();

    }

    @Override
    public Set<Business> findByDistanceAndCategories(Position position, List<BusinessCategory> categories, int maxDistance) {

        if (categories.size() == 0) {
            return new HashSet<>();
        }
        double[] doubles = computeMaxCoordinate(position, maxDistance);


        //Select distinct d from Distributor d join d.towns t join t.district t where t.name = :name

        String request = "select b from Business b inner join b.businessCategories c where c in :categories and b.address.posx > :coord1 and b.address.posx < :coord2 and b.address.posy > :coord3 and b.address.posy < :coord4 and b.businessStatus = :status order by searchableName";

        List<Business> resultList = JPA.em().createQuery(request, Business.class)
                .setParameter("categories", categories)
                .setParameter("coord1", doubles[0])
                .setParameter("coord2", doubles[1])
                .setParameter("coord3", doubles[2])
                .setParameter("coord4", doubles[3])
                .setParameter("status", BusinessStatusEnum.PUBLISHED)
                .getResultList();
        HashSet<Business> businesses = new HashSet<>(resultList);
        return businesses;
    }

    @Override
    public List<Business> findByFollowed(Account currentUser) {

        String request = "Select b from Business b, FollowLink f where b.businessStatus = :status and f.business=b and f.account=:account";

        return JPA.em().createQuery(request, Business.class)
                .setParameter("account", currentUser)
                .setParameter("status", BusinessStatusEnum.PUBLISHED)
                .getResultList();
    }

    @Override
    public Business findByAccount(Account account) {

        String request = "Select b from Business b where b.account= :account";

        return JPA.em().createQuery(request, Business.class)
                .setParameter("account", account)
                .getSingleResult();

    }

    @Override
    public Long countAll() {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Business> from = cq.from(Business.class);
        cq.select(cb.count(from));

        return JPA.em().createQuery(cq).getSingleResult();

    }

    @Override
    public long countByStatus(BusinessStatusEnum published) {


        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Business> from = cq.from(Business.class);
        cq.select(cb.count(from));

        cq.where(cb.equal(from.get("businessStatus"), published));

        return JPA.em().createQuery(cq).getSingleResult();
    }

    @Override
    public long countAtLeastOneActivePublication() {

        long total = 0;

        for (Business business : findAll()) {

            if (business.getBusinessStatus().equals(BusinessStatusEnum.PUBLISHED)) {
                for (AbstractPublication publication : business.getPublications()) {
                    if (publication.getEndDate().compareTo(LocalDateTime.now()) > 0) {
                        total++;
                        break;
                    }
                }
            }
        }
        return total;


    }

    @Override
    public long countAtLeastOnePublication() {

        long total = 0;

        for (Business business : findAll()) {

            if (business.getBusinessStatus().equals(BusinessStatusEnum.PUBLISHED) && business.getPublications().size() > 0) {
                total++;
            }
        }

        return total;
    }

    @Override
    public long countAtLeastOnePublicationFrom(LocalDateTime from) {
        long total = 0;

        for (Business business : findAll()) {

            if (business.getBusinessStatus().equals(BusinessStatusEnum.PUBLISHED)) {
                for (AbstractPublication publication : business.getPublications()) {
                    if (publication.getStartDate().compareTo(from) > 0) {
                        total++;
                        break;
                    }
                }
            }
        }
        return total;
    }
}
