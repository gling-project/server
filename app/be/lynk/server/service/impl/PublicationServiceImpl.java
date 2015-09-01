package be.lynk.server.service.impl;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.model.Position;
import be.lynk.server.model.SearchResult;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.PublicationService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by florian on 5/06/15.
 */
@Service
public class PublicationServiceImpl extends CrudServiceImpl<AbstractPublication> implements PublicationService {

    private static final Double EARTH_RADIUS = 6371.0;
    private static final Boolean OPT1 = false;

    private static enum PublicationTiming {FUTURE, PASSED, NOW}


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
    public List<SearchResult> findActivePublicationByBusiness(Business business) {
        return search(null, null, PublicationTiming.NOW, Arrays.asList(business), null);
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
                "b.businessStatus = :businessStatus ";

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
                .setParameter("businessStatus", BusinessStatus.PUBLISHED);

        if (position != null && maxDistance != null) {

            double r = maxDistance / EARTH_RADIUS;

            double lat = Math.toRadians(position.getX());
            double lon = Math.toRadians(position.getY());
            double latMinR = lat - r;
            double latMaxR = lat + r;
            double latMin = Math.toDegrees(latMinR);
            double latMax = Math.toDegrees(latMaxR);
            double lonDelta = Math.asin(Math.sin(r) / Math.cos(lat));
            double lonMinR = lon - lonDelta;
            double lonMaxR = lon + lonDelta;
            double lonMin = Math.toDegrees(lonMinR);
            double lonMax = Math.toDegrees(lonMaxR);

            query.setParameter("latmin", latMin)
                    .setParameter("latmax", latMax)
                    .setParameter("lonmin", lonMin)
                    .setParameter("lonmax", lonMax);
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
    public List<AbstractPublication> search(String criteria, int max) {

        criteria = normalizeForSearch(criteria);

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        Path<Business> business = from.get("business");
        cq.select(from);
        cq.where(cb.like(from.get("searchableTitle"), criteria)
                , cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(business.get("businessStatus"), BusinessStatus.PUBLISHED)
        );

        return JPA.em().createQuery(cq)
                .setMaxResults(max)
                .getResultList();
    }


    @Override
    public List<AbstractPublication> findBySearchResults(List<SearchResult> searchResults) {
        List<Long> ids = searchResults.stream().map(s -> s.getPublicationId()).collect(Collectors.toList());

        String request = "SELECT p FROM AbstractPublication p where p.id in :idList";

        return JPA.em().createQuery(request, AbstractPublication.class)
                .setParameter("idList", ids)
                .getResultList();
    }
}
