package be.lynk.server.service.impl;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.model.Position;
import be.lynk.server.model.PublicationTypeEnum;
import be.lynk.server.model.SearchResult;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.BusinessNotification;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.PublicationService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

/**
 * Created by florian on 5/06/15.
 */
@Service
public class PublicationServiceImpl extends CrudServiceImpl<AbstractPublication> implements PublicationService {


    private static final Boolean OPT1 = false;

    private static enum PublicationTiming {FUTURE, PASSED, NOW, NOW_AND_PASSED}


    @Override
    public List<SearchResult> findActivePublication(Position position,
                                                    Double maxDistance) {
        return search(position, maxDistance, PublicationTiming.NOW, null, null);
    }

    @Override
    public List<SearchResult> findActivePublicationByBusinesses(Position position,
                                                                Double maxDistance,
                                                                List<Business> businesses) {
        return search(position, maxDistance, PublicationTiming.NOW, businesses, null);
    }

    @Override
    public List<SearchResult> findPassedPublicationByBusiness(Business business) {
        return search(null, null, PublicationTiming.NOW_AND_PASSED, Arrays.asList(business), null);
    }

    @Override
    public List<SearchResult> findActivePublicationByBusiness(Business business) {
        return search(null, null, PublicationTiming.NOW, Arrays.asList(business), null);
    }


    @Override
    public List<SearchResult> findPublicationByBusiness(Business business) {
        return search(null, null, null, Arrays.asList(business), null);
    }


    @Override
    public List<SearchResult> findArchivedPublicationByBusiness(Business business) {
        return search(null, null, PublicationTiming.PASSED, Arrays.asList(business), null);
    }

    @Override
    public List<SearchResult> findFuturePublicationByBusiness(Business business) {
        return search(null, null, PublicationTiming.FUTURE, Arrays.asList(business), null);
    }

    @Override
    public List<SearchResult> findActivePublicationByInterest(Position position, Double maxDistance, CustomerInterest interest) {
        return search(null, null, PublicationTiming.NOW, null, interest);
    }

    @Override
    public List<SearchResult> findActivePublicationByBusinessesAndInterest(Position position, Double maxDistance, List<Business> businesses, CustomerInterest interest) {
        return search(null, null, PublicationTiming.NOW, businesses, interest);
    }


    private List<SearchResult> search(Position position,
                                      Double maxDistance,
                                      PublicationTiming publicationTiming,
                                      List<Business> businesses,
                                      CustomerInterest interest) {

        //first : compute radius
        //r is exprime in angular radius

        LocalDateTime now = LocalDateTime.now();
        String request;
        List<SearchResult> resultList;

        request = "SELECT NEW be.lynk.server.model.SearchResult(p.id,a.posx, a.posy, p.startDate, p.endDate, i) " +
                "from AbstractPublication p, Business b, Address a " +
                " LEFT JOIN p.interest AS i " +
                " WHERE " +
                "p.business=b and " +
                "b.address = a and " +
                "p.wasRemoved =false and " +
                "b.businessStatus = :businessStatus ";

        if (publicationTiming != null) {
            switch (publicationTiming) {
                case FUTURE:
                    request += " AND p.startDate > NOW() ";
                    break;
                case PASSED:
                    request += " AND p.endDate < NOW() ";
                    break;
                case NOW:
                    request += " AND p.startDate < NOW() and  p.endDate > NOW() ";
                    break;
                case NOW_AND_PASSED:
                    request += " AND p.startDate < NOW() ";
                    break;
            }
        }

        if (position != null && maxDistance != null) {
            request += " AND (posx > :latmin AND posx < :latmax) AND (posy > :lonmin AND posy < :lonmax)";
        }

        if (businesses != null) {
            if (businesses.size() == 0) {
                return new ArrayList<>();
            }
            request += " AND b in :businesses ";
        }

        if (interest != null) {
            request += " AND p.interest = :interest ";
        }

        //by default, order by startDate
        request += " ORDER BY p.startDate DESC ";

        TypedQuery<SearchResult> query = JPA.em().createQuery(request, SearchResult.class)
                .setParameter("businessStatus", BusinessStatusEnum.PUBLISHED);

        if (position != null && maxDistance != null) {

            double[] maxCoordinate = computeMaxCoordinate(position, maxDistance);

            query.setParameter("latmin", maxCoordinate[0])
                    .setParameter("latmax", maxCoordinate[1])
                    .setParameter("lonmin", maxCoordinate[2])
                    .setParameter("lonmax", maxCoordinate[3]);
        }
        if (businesses != null) {
            query.setParameter("businesses", businesses);
        }
        if (interest != null) {
            query.setParameter("interest", interest);
        }

        resultList = query.getResultList();

        return resultList;

    }


    @Override
    public List<AbstractPublication> findActiveByIds(List<Long> ids) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        Path<Business> business = from.get("business");
        cq.select(from);
        cq.where(cb.in(from.get("id")).value(ids)
                , cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(from.get("wasRemoved"), false)
                , cb.equal(business.get("businessStatus"), BusinessStatusEnum.PUBLISHED)
        );
        cq.orderBy(cb.desc(from.get("startDate")));


        return JPA.em().createQuery(cq)
                .getResultList();

    }


    @Override
    public List<AbstractPublication> search(String criteria, int page, int maxResult) {

        criteria = normalizeForSearch(criteria);

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        Path<Business> business = from.get("business");
        cq.select(from);
        cq.where(cb.like(from.get("searchableTitle"), criteria)
                , cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(from.get("wasRemoved"), false)
                , cb.equal(business.get("businessStatus"), BusinessStatusEnum.PUBLISHED)
        );
        cq.orderBy(cb.desc(from.get("startDate")));


        return JPA.em().createQuery(cq)
                .setFirstResult(page * maxResult)
                .setMaxResults(maxResult)
                .getResultList();
    }


    @Override
    public List<AbstractPublication> findBySearchResults(List<SearchResult> searchResults) {
        if (searchResults.size() == 0) {
            return new ArrayList<>();
        }
        List<Long> ids = searchResults.stream().map(s -> s.getPublicationId()).collect(Collectors.toList());

        String request = "SELECT p FROM AbstractPublication p where p.id in :idList";

        return JPA.em().createQuery(request, AbstractPublication.class)
                .setParameter("idList", ids)
                .getResultList();
    }

    /**
     * Only active.
     * Only with a publication time more than 25h
     *
     * @param business
     * @param page
     * @return
     */
    @Override
    public List<AbstractPublication> findByBusinessForTown(Business business, Integer page, Integer maxResult) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        cq.select(from);
        cq.where(cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(from.get("business"), business)
                , cb.equal(from.get("wasRemoved"), false));
        cq.orderBy(cb.desc(from.get("startDate")));

        return JPA.em().createQuery(cq)
                .setFirstResult(page * maxResult)
                .setMaxResults(maxResult)
                .getResultList();
    }

    @Override
    public List<AbstractPublication> findActiveNotificationByTypeAndZip(Integer zip, Integer page, Integer maxResult) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        Path<Business> business = from.get("business");
        Path<Object> address = business.get("address");
        cq.select(from);
        cq.where(cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(from.get("wasRemoved"), false)
                , cb.equal(address.get("zip"), zip.toString())
                , cb.equal(business.get("businessStatus"), BusinessStatusEnum.PUBLISHED)
                , cb.equal(from.get("type"), PublicationTypeEnum.NOTIFICATION));
        cq.orderBy(cb.desc(from.get("startDate")));

        return JPA.em().createQuery(cq)
                .setFirstResult(page * maxResult)
                .setMaxResults(maxResult)
                .getResultList();
    }

    @Override
    public List<AbstractPublication> findActivePromotionByTypeAndZip(Integer zip, Integer page, Integer maxResult) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        Path<Business> business = from.get("business");
        Path<Object> address = business.get("address");
        cq.select(from);
        cq.where(cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(from.get("wasRemoved"), false)
                , cb.equal(address.get("zip"), zip.toString())
                , cb.equal(business.get("businessStatus"), BusinessStatusEnum.PUBLISHED)
                , cb.equal(from.get("type"), PublicationTypeEnum.PROMOTION));
        cq.orderBy(cb.desc(from.get("startDate")));

        return JPA.em().createQuery(cq)
                .setFirstResult(page * maxResult)
                .setMaxResults(maxResult)
                .getResultList();
    }

    @Override
    public int countPublicationForToday(LocalDateTime day, Business business) {

        String r = "select count(p) from AbstractPublication p where startDate > :start  and startDate < :end and p.business=:business and p.wasRemoved=:wasRemoved";

        Long c = JPA.em().createQuery(r, Long.class)
                .setParameter("start", day.withHour(0).withMinute(0).withSecond(0))
                .setParameter("end", day.withHour(23).withMinute(59).withSecond(59))
                .setParameter("wasRemoved", false)
                .setParameter("business", business)
                .getSingleResult();

        return c.intValue();


    }


    @Override
    public Long countByBusiness(Business business) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        cq.select(cb.count(from));

        cq.where(cb.equal(from.get("business"), business));

        return JPA.em().createQuery(cq).getSingleResult();

    }

    @Override
    public Long countActiveByBusiness(Business business) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        cq.select(cb.count(from));

        cq.where(cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(from.get("wasRemoved"), false)
                , cb.equal(from.get("business"), business));

        return JPA.em().createQuery(cq).getSingleResult();


    }

    @Override
    public Long countAll() {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        cq.select(cb.count(from));

        return JPA.em().createQuery(cq).getSingleResult();
    }

    @Override
    public Long countActive() {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        cq.select(cb.count(from));
        Path<Business> business = from.get("business");

        cq.where(cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(from.get("wasRemoved"), false)
                , cb.equal(business.get("businessStatus"), BusinessStatusEnum.PUBLISHED));

        return JPA.em().createQuery(cq).getSingleResult();
    }

    @Override
    public Long countActiveFrom(LocalDateTime localDateTime) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        cq.select(cb.count(from));
        Path<Business> business = from.get("business");

        cq.where(cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(from.get("wasRemoved"), false)
                , cb.greaterThan(from.get("creationDate"), localDateTime)
                , cb.equal(business.get("businessStatus"), BusinessStatusEnum.PUBLISHED));

        return JPA.em().createQuery(cq).getSingleResult();
    }

    @Override
    public int countPublicationForWeek(LocalDateTime day, Business business) {

        TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();
        LocalDateTime startday = day.with(fieldISO, 1).withHour(0).withMinute(0).withSecond(1);
        LocalDateTime endday = day.with(fieldISO, 7).withHour(23).withMinute(59).withSecond(59);


        String r = "select count(p) from AbstractPublication p where startDate > :start  and startDate < :end and p.business=:business and p.wasRemoved=:wasRemoved";

        Long c = JPA.em().createQuery(r, Long.class)
                .setParameter("start", startday)
                .setParameter("end", endday)
                .setParameter("wasRemoved", false)
                .setParameter("business", business)
                .getSingleResult();

        return c.intValue();

    }
}
