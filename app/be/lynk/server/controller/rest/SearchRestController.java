package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.model.Position;
import be.lynk.server.model.SearchCriteriaEnum;
import be.lynk.server.model.SearchResult;
import be.lynk.server.model.entities.*;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.*;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by florian on 23/05/15.
 */
@org.springframework.stereotype.Controller
public class SearchRestController extends AbstractRestController {

    private static final Double MAX_DISTANCE = 20.0;
    private static final int NUMBER_RESULT_BY_PAGE = 20;


    @Autowired
    private BusinessService businessService;
    @Autowired
    private LocalizationService localizationService;
    @Autowired
    private PublicationService publicationService;
    @Autowired
    private FollowLinkService followLinkService;
    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private BusinessCategoryService businessCategoryService;

    @Transactional
    public Result getBusinessArchive(Integer page, long id) {

        Business byId = businessService.findById(id);

        //load
        List<SearchResult> searchResults = publicationService.findArchivedPublicationByBusiness(byId);

        return selectByPageAndStartDate(page, searchResults);
    }

    @Transactional
    public Result getBusinessPrevisualization(Integer page, long id) {

        Business byId = businessService.findById(id);

        //load
        List<SearchResult> searchResults = publicationService.findFuturePublicationByBusiness(byId);

        return selectByPageAndStartDate(page, searchResults);
    }

    @Transactional
    public Result getBusiness(Integer page, long id) {

        Business byId = businessService.findById(id);

        //load
        List<SearchResult> searchResults = publicationService.findActivePublicationByBusiness(byId);

        return selectByPageAndStartDate(page, searchResults);
    }

    @Transactional
    public Result getByDefault(Integer page) {

        Logger.info("Serach Default page "+page);

        long t = new Date().getTime();

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        Position position = dozerService.map(dto, Position.class);

        List<SearchResult> searchResults = publicationService.findActivePublication(position, MAX_DISTANCE);

        return selectByPageAndAlgotithme(t,page, searchResults, position);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result getByFollowed(Integer page) {

        long t = new Date().getTime();

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        Position position = dozerService.map(dto, Position.class);

        Account currentUser = securityController.getCurrentUser();

        List<Business> businesses = followLinkService.findBusinessByAccount(currentUser);


        List<SearchResult> finalList = publicationService.findActivePublicationByBusinesses(position, MAX_DISTANCE, businesses);

        return selectByPageAndAlgotithme(t,page, finalList, position);
    }

    @Transactional
    public Result getByInterest(Integer page, long id) {

        long t = new Date().getTime();

        //load interest
        CustomerInterest interest = customerInterestService.findById(id);

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        Position position = dozerService.map(dto, Position.class);

        List<SearchResult> publications = publicationService.findActivePublicationByInterest(position, MAX_DISTANCE, interest);

        return selectByPageAndAlgotithme(t,page, publications, position);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result getByInterestAndFollowed(Integer page, long id) {

        long t = new Date().getTime();

        //load interest
        CustomerInterest interest = customerInterestService.findById(id);

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        Position position = dozerService.map(dto, Position.class);

        List<Business> businesses = followLinkService.findBusinessByAccount(securityController.getCurrentUser());

        List<SearchResult> publications = publicationService.findActivePublicationByBusinessesAndInterest(position, MAX_DISTANCE, businesses, interest);

        return selectByPageAndAlgotithme(t,page, publications, position);
    }

    private Result selectByPageAndStartDate(Integer page, List<SearchResult> searchResults) {

        //sort
        Collections.sort(searchResults, new Comparator<SearchResult>() {
            @Override
            public int compare(SearchResult o1, SearchResult o2) {
                return o2.getStartDate().compareTo(
                        o2.getStartDate());
            }
        });

        //limit
        int min = page * NUMBER_RESULT_BY_PAGE;
        int max = (page + 1) * NUMBER_RESULT_BY_PAGE;
        if (searchResults.size() <= min) {
            return ok(new ListDTO<>());
        }
        if (searchResults.size() < max) {
            max = searchResults.size() - 1;
        }
        List<SearchResult> finalResult = searchResults.subList(min, max);

        //load publication
        List<AbstractPublication> publications = publicationService.findBySearchResults(finalResult);

        List<AbstractPublicationDTO> publication = dozerService.map(publications, AbstractPublicationDTO.class);

        Collections.sort(publication);

        return ok(new ListDTO<>(publication));
    }

    private Result selectByPageAndAlgotithme(long t,Integer page, List<SearchResult> searchResults, Position position) {


        String s = "";

        s += "====== Default selectByPageAndAlgotithme\n";


        s += "====== Find : " + (new Date().getTime() - t) + "\n";

        //compute distance
        for (SearchResult publication : searchResults) {
            publication.setDistance(localizationService.distance(position.getX(), position.getY(), publication.getPosx(), publication.getPosy(), null));
        }

        s += "====== DISTANCE : " + (new Date().getTime() - t) + "\n";

        //sort
        Collections.sort(searchResults);

        s += "====== SORT : " + (new Date().getTime() - t) + "\n";

        //select
        int min = page * NUMBER_RESULT_BY_PAGE;
        int max = (page + 1) * NUMBER_RESULT_BY_PAGE;
        if (searchResults.size() <= min) {
            return ok(new ListDTO<>());
        }
        if (searchResults.size() < max) {
            max = searchResults.size() - 1;
        }
        List<SearchResult> finalResult = searchResults.subList(min, max);

        s += "====== SELECT : " + (new Date().getTime() - t) + "\n";

        //load publication
        List<AbstractPublication> publications = publicationService.findBySearchResults(finalResult);

        s += "====== LOAD : " + (new Date().getTime() - t) + "\n";


        ListDTO<AbstractPublicationDTO> abstractPublicationDTOListDTO = new ListDTO<>(finalize(position, publications, t));

        s += "====== Finalize : " + (new Date().getTime() - t) + "\n";

        Logger.info(s);

        return ok(abstractPublicationDTOListDTO);
    }

    @Transactional
    public Result getByString() {

        //TODO do not compute distance for little

        int max = 20;

        SearchDTO searchDTO = extractDTOFromRequest(SearchDTO.class);

        Position position = dozerService.map(searchDTO.getPosition(), Position.class);

        //parse criteria
        SearchElement searchElement = new SearchElement(searchDTO.getSearch());
        SearchResultDTO searchResultDTO = new SearchResultDTO();
        if (searchElement.getParameters().size() > 0) {
            for (String s : searchElement.getParameters()) {
                SearchCriteriaEnum searchCriteriaEnum = SearchCriteriaEnum.findByKey(s);
                if (searchCriteriaEnum == null) {
                    throw new MyRuntimeException(ErrorMessageEnum.SEARCH_WRONG_CRITERIA);
                }

                switch (searchCriteriaEnum) {
                    case CATEGORY:
                        //1 recover cat
                        List<BusinessCategory> categories = businessCategoryService.search(searchElement.getText(), lang(), max);
                        if (categories.size() == 1) {
                            //load 20 possible businesses
                            searchResultDTO.getCategoriesMap().add(new SearchResultDTO.BusinessesByCategory(
                                    dozerService.map(categories.get(0), BusinessCategoryFlatDTO.class),
                                    finalizeBusiness(searchDTO.getPosition(), businessService.findByCategory(categories.get(0), 20))));
                        } else {
                            //for each, load max 4 businesses
                            searchResultDTO.getCategoriesMap().add(new SearchResultDTO.BusinessesByCategory(
                                    dozerService.map(categories.get(0), BusinessCategoryFlatDTO.class),
                                    finalizeBusiness(searchDTO.getPosition(), businessService.findByCategory(categories.get(0), 4))));
                        }
                        break;
                    case BUSINESS:
                        searchResultDTO.setBusinesses(finalizeBusiness(searchDTO.getPosition(), businessService.search(searchElement.getText(), max)));
                        break;
                    case PUBLICATION:
                        searchResultDTO.setPublications(finalize(position, publicationService.search(searchElement.getText(), max)));
                        break;
                }
            }
        } else {
            //1 recover cat
            List<BusinessCategory> categories = businessCategoryService.search(searchElement.getText(), lang(), max);
            if (categories.size() == 1) {
                //load 20 possible businesses
                searchResultDTO.getCategoriesMap().add(new SearchResultDTO.BusinessesByCategory(
                        dozerService.map(categories.get(0), BusinessCategoryFlatDTO.class),
                        finalizeBusiness(searchDTO.getPosition(), businessService.findByCategory(categories.get(0), 20))));
            } else {
                //for each, load max 4 businesses
                searchResultDTO.getCategoriesMap().add(new SearchResultDTO.BusinessesByCategory(
                        dozerService.map(categories.get(0), BusinessCategoryFlatDTO.class),
                        finalizeBusiness(searchDTO.getPosition(), businessService.findByCategory(categories.get(0), 4))));
            }
            searchResultDTO.setBusinesses(finalizeBusiness(searchDTO.getPosition(), businessService.search(searchElement.getText(), max)));
            searchResultDTO.setPublications(finalize(position, publicationService.search(searchElement.getText(), max)));
        }
        return ok(searchResultDTO);
    }

    @Transactional
    public Result getByStringLittle() {

        //TODO do not compute distance for little

        int max = 4;

        SearchDTO searchDTO = extractDTOFromRequest(SearchDTO.class);

        List<AbstractPublication> finalList = new ArrayList<>();

        Position position = dozerService.map(searchDTO.getPosition(), Position.class);

        //parse criteria
        SearchElement searchElement = new SearchElement(searchDTO.getSearch());
        SearchLittleResultDTO searchLittleResultDTO = new SearchLittleResultDTO();
        if (searchElement.getParameters().size() > 0) {
            for (String s : searchElement.getParameters()) {
                SearchCriteriaEnum searchCriteriaEnum = SearchCriteriaEnum.findByKey(s);
                if (searchCriteriaEnum == null) {
                    throw new MyRuntimeException(ErrorMessageEnum.SEARCH_WRONG_CRITERIA);
                }

                switch (searchCriteriaEnum) {
                    case CATEGORY:
                        searchLittleResultDTO.setCategories(dozerService.map(businessCategoryService.search(searchElement.getText(), lang(), max), BusinessCategoryFlatDTO.class));
                        break;
                    case BUSINESS:
                        searchLittleResultDTO.setBusinesses(finalizeBusiness(searchDTO.getPosition(), businessService.search(searchElement.getText(), max)));
                        break;
                    case PUBLICATION:
                        searchLittleResultDTO.setPublications(finalize(position, publicationService.search(searchElement.getText(), max)));
                        break;
                }
            }
        } else {
            searchLittleResultDTO.setCategories(dozerService.map(businessCategoryService.search(searchElement.getText(), lang(), max), BusinessCategoryFlatDTO.class));
            searchLittleResultDTO.setBusinesses(finalizeBusiness(searchDTO.getPosition(), businessService.search(searchElement.getText(), max)));
            searchLittleResultDTO.setPublications(finalize(position, publicationService.search(searchElement.getText(), max)));
        }

        return ok(searchLittleResultDTO);
    }

    private List<BusinessToDisplayDTO> finalizeBusiness(PositionDTO dto, List<Business> businesses) {
        //compute distance
        List<BusinessToDisplayDTO> finalResult = new ArrayList<>();

        if (businesses.size() > 0) {

            //limit to 20 !
            if (businesses.size() > 20) {
                businesses = businesses.subList(0, 20);
            }

            Map<Business, Long> addressLongMap = localizationService.distanceBetweenAddresses(dozerService.map(dto, Position.class), businesses);

            for (Map.Entry<Business, Long> addressLongEntry : addressLongMap.entrySet()) {
                for (Business business : businesses) {
                    if (addressLongEntry.getKey().equals(business)) {

                        BusinessToDisplayDTO businessToDisplayDTO = dozerService.map(business, BusinessToDisplayDTO.class);

                        businessToDisplayDTO.setDistance(addressLongEntry.getValue());
                        finalResult.add(businessToDisplayDTO);

                        //additional data
                        if (securityController.isAuthenticated(ctx())) {
                            businessToDisplayDTO.setFollowing(followLinkService.testByAccountAndBusiness(securityController.getCurrentUser(), business));
                        }
                        businessToDisplayDTO.setTotalFollowers(followLinkService.countByBusiness(business));

                        //order gallery
                        Collections.sort(businessToDisplayDTO.getGalleryPictures());
                    }
                }
            }
        }

        Collections.sort(finalResult);

        return finalResult;//

    }

    private List<AbstractPublicationDTO> finalize(Position position, List<AbstractPublication> publications) {
        return finalize(position, publications, new Date().getTime());
    }

    private List<AbstractPublicationDTO> finalize(Position position, List<AbstractPublication> publications, long t) {

        //compute distance
        List<Business> addresses = new ArrayList<>();
        List<AbstractPublicationDTO> l = new ArrayList<>();

        if (publications.size() > 0) {

            //limit to 20 !
            if (publications.size() > 20) {
                publications = publications.subList(0, 20);
            }


            for (AbstractPublication publication : publications) {
                if (!addresses.contains(publication.getBusiness())) {
                    addresses.add(publication.getBusiness());
                }
            }
            Map<Business, Long> addressLongMap = localizationService.distanceBetweenAddresses(dozerService.map(position, Position.class), addresses);

            for (Map.Entry<Business, Long> addressLongEntry : addressLongMap.entrySet()) {
                for (AbstractPublication publication : publications) {
                    if (addressLongEntry.getKey().equals(publication.getBusiness())) {

                        AbstractPublicationDTO publicationDTO = dozerService.map(publication, AbstractPublicationDTO.class);
                        publicationDTO.setDistance(addressLongEntry.getValue());
                        l.add(publicationDTO);
                        //add business name
                        publicationDTO.setBusinessName(publication.getBusiness().getName());
                        publicationDTO.setBusinessIllustration(dozerService.map(publication.getBusiness().getIllustration(), StoredFileDTO.class));
                        publicationDTO.setBusinessId(publication.getBusiness().getId());
                        //follow ?
                        if (securityController.isAuthenticated(ctx())) {
                            Account account = securityController.getCurrentUser();
                            publicationDTO.setFollowing(followLinkService.testByAccountAndBusiness(account, publication.getBusiness()));

                        }
                        publicationDTO.setTotalFollowers(followLinkService.countByBusiness(publication.getBusiness()));
                    }
                }
            }
        }

        Collections.sort(l);

        return l;//
    }


    private static class SearchElement {

        private Pattern pattern = Pattern.compile("^(([^:]*):)?([^:]*)$");
        private Pattern pattern2 = Pattern.compile("([a-z]+)(\\||$)");

        private List<String> parameters = new ArrayList<>();
        private String text;

        public SearchElement(String s) {
            Matcher matcher = pattern.matcher(s);

            while (matcher.find()) {

                System.out.println("-2:" + matcher.group(2));

                if (matcher.group(2) != null) {
                    Matcher matcher1 = pattern2.matcher(matcher.group(2));
                    while (matcher1.find()) {
                        parameters.add(matcher1.group(1));
                    }
                }


                text = matcher.group(3);
            }
        }

        public List<String> getParameters() {
            return parameters;
        }

        public String getText() {
            return text;
        }
    }

    private List<AbstractPublication> sortByInterest(List<AbstractPublication> publications, CustomerInterest expectedInterest) {
        List<AbstractPublication> finalList = new ArrayList<>();

        //sort
        for (AbstractPublication publication : publications) {
            if (publication.getInterest() != null) {
                if (publication.getInterest().equals(expectedInterest)) {
                    finalList.add(publication);
                }
            } else {
                for (BusinessCategory businessCategory : publication.getBusiness().getBusinessCategories()) {
                    for (CategoryInterestLink categoryInterestLink : businessCategory.getLinks()) {
                        if (categoryInterestLink.getCustomerInterest().equals(expectedInterest)) {
                            finalList.add(publication);
                            break;
                        }
                    }
                }
            }
        }
        return finalList;
    }


}
