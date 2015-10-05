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
import be.lynk.server.util.StringUtil;
import be.lynk.server.util.constants.Constant;
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

    private static final Double MAX_DISTANCE          = 20.0;
    private static final int    NUMBER_RESULT_BY_PAGE = 20;


    @Autowired
    private BusinessService         businessService;
    @Autowired
    private LocalizationService     localizationService;
    @Autowired
    private PublicationService      publicationService;
    @Autowired
    private FollowLinkService       followLinkService;
    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private BusinessCategoryService businessCategoryService;

    @Transactional
    public Result getNearBusinessByInterest(Long interestID) {

        //create category list
        CustomerInterest interest = customerInterestService.findById(interestID);
        List<BusinessCategory> categories = new ArrayList<>();
        for (CategoryInterestLink categoryInterestLink : interest.getLinks()) {
            if (categoryInterestLink.getPriority().equals(1)) {
                categories.add(categoryInterestLink.getBusinessCategory());
            }
        }

        Position position = extractPosition();

        Set<Business> businesses = businessService.findByDistanceAndCategories(position, categories, 20);

        List<BusinessToDisplayDTO> businessToDisplayDTOs = finalizeBusiness(position, new ArrayList<>(businesses), OrderType.DISTANCE);


        return ok(new ListDTO<>(businessToDisplayDTOs));
    }

    @Transactional
    public Result getNearBusiness() {

        Position position = extractPosition();

        List<Business> businesses = businessService.findByDistance(position, 20);

        List<BusinessToDisplayDTO> businessToDisplayDTOs = finalizeBusiness(position, businesses, OrderType.DISTANCE);

        return ok(new ListDTO<>(businessToDisplayDTOs));

    }

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

        Result result = selectByPageAndStartDate(page, searchResults);

        return result;
    }

    @Transactional
    public Result getByDefault(Integer page) {

        Logger.info("Serach Default page " + page);

        long t = new Date().getTime();

        Position position = extractPosition();

        List<SearchResult> searchResults = publicationService.findActivePublication(position, MAX_DISTANCE);

        return selectByPageAndAlgorithme(t, page, searchResults, position);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result getByFollowed(Integer page) {

        long t = new Date().getTime();

        Position position = extractPosition();

        Account currentUser = securityController.getCurrentUser();

        List<Business> businesses = followLinkService.findBusinessByAccount(currentUser);


        List<SearchResult> finalList = publicationService.findActivePublicationByBusinesses(position, MAX_DISTANCE, businesses);

        return selectByPageAndAlgorithme(t, page, finalList, position);
    }

    @Transactional
    public Result getByInterest(Integer page, long id) {

        long t = new Date().getTime();

        //load interest
        CustomerInterest interest = customerInterestService.findById(id);

        Position position = extractPosition();

        List<SearchResult> publications = publicationService.findActivePublicationByInterest(position, MAX_DISTANCE, interest);

        return selectByPageAndAlgorithme(t, page, publications, position);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result getByInterestAndFollowed(Integer page, long id) {

        long t = new Date().getTime();

        //load interest
        CustomerInterest interest = customerInterestService.findById(id);

        Position position = extractPosition();

        List<Business> businesses = followLinkService.findBusinessByAccount(securityController.getCurrentUser());

        List<SearchResult> publications = publicationService.findActivePublicationByBusinessesAndInterest(position, MAX_DISTANCE, businesses, interest);

        Result result = selectByPageAndAlgorithme(t, page, publications, position);

        return result;
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
            max = searchResults.size();
        }
        List<SearchResult> finalResult = searchResults.subList(min, max);

        //load publication
        List<AbstractPublication> publications = publicationService.findBySearchResults(finalResult);

        List<AbstractPublicationDTO> publication = dozerService.map(publications, AbstractPublicationDTO.class);

        Collections.sort(publication);

        return ok(new ListDTO<>(publication));
    }

    private Result selectByPageAndAlgorithme(long t, Integer page, List<SearchResult> searchResults, Position position) {


        String s = "";

        s += "====== Default selectByPageAndAlgorithme\n";


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
            max = searchResults.size();
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

        Position position = extractPosition(searchDTO.getPosition());

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
                        List<BusinessCategory> categories = businessCategoryService.search(searchElement.getText(), lang(), null);

                        if (categories.size() > 0) {
                            createCategorySearchResult(categories, searchDTO, searchResultDTO, searchDTO.getPage(), (categories.size() == 1 && categories.get(0).getChildren().size() == 0), true);
                        }
                        break;
                    case BUSINESS:
                        searchResultDTO.setBusinesses(finalizeBusiness(position, businessService.search(searchElement.getText(), searchDTO.getPage(), max), OrderType.NAME));
                        break;
                    case PUBLICATION:
                        searchResultDTO.setPublications(finalize(position, publicationService.search(searchElement.getText(), searchDTO.getPage(), max)));
                        break;
                }
            }
        } else {
            //1 recover cat
            List<BusinessCategory> categories = businessCategoryService.search(searchElement.getText(), lang(), null);
            if (categories.size() > 0) {
                createCategorySearchResult(categories, searchDTO, searchResultDTO, searchDTO.getPage(), (categories.size() == 1 && categories.get(0).getChildren().size() == 0), true);
            }
            List<BusinessToDisplayDTO> businessToDisplayDTOs = finalizeBusiness(position, businessService.search(searchElement.getText(), searchDTO.getPage(), max), OrderType.NAME);
            searchResultDTO.setBusinesses(businessToDisplayDTOs);
            searchResultDTO.setPublications(finalize(position, publicationService.search(searchElement.getText(), searchDTO.getPage(), max)));
        }
        return ok(searchResultDTO);
    }

    @Transactional
    public Result getByStringLittle() {

        //TODO do not compute distance for little

        int max = 4;

        SearchDTO searchDTO = extractDTOFromRequest(SearchDTO.class);

        List<AbstractPublication> finalList = new ArrayList<>();

        Position position = extractPosition(searchDTO.getPosition());

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
                        searchLittleResultDTO.setBusinesses(finalizeBusiness(position, businessService.search(searchElement.getText(), 0, max), OrderType.NAME));
                        break;
                    case PUBLICATION:
                        searchLittleResultDTO.setPublications(finalize(position, publicationService.search(searchElement.getText(), 0, max)));
                        break;
                }
            }
        } else {
            searchLittleResultDTO.setCategories(dozerService.map(businessCategoryService.search(searchElement.getText(), lang(), max), BusinessCategoryFlatDTO.class));
            searchLittleResultDTO.setBusinesses(finalizeBusiness(position, businessService.search(searchElement.getText(), 0, max), OrderType.NAME));
            searchLittleResultDTO.setPublications(finalize(position, publicationService.search(searchElement.getText(), 0, max)));
        }

        return ok(searchLittleResultDTO);
    }

    private List<BusinessToDisplayDTO> finalizeBusiness(Position position, List<Business> businesses, OrderType orderType) {
        //compute distance
        List<BusinessToDisplayDTO> finalResult = new ArrayList<>();

        if (businesses.size() > 0) {

            //limit to 20 !
            if (businesses.size() > 20) {
                businesses = businesses.subList(0, 20);
            }

            Map<Business, Long> addressLongMap = localizationService.distanceBetweenAddresses(position, businesses);

            for (Map.Entry<Business, Long> addressLongEntry : addressLongMap.entrySet()) {
                for (Business business : businesses) {
                    if (addressLongEntry.getKey().equals(business)) {

                        BusinessToDisplayDTO businessToDisplayDTO = dozerService.map(business, BusinessToDisplayDTO.class);

                        businessToDisplayDTO.setDistance(addressLongEntry.getValue());
                        finalResult.add(businessToDisplayDTO);

                        //additional data
                        if (securityController.isAuthenticated(ctx())) {
                            FollowLink followLink = followLinkService.findByAccountAndBusiness(securityController.getCurrentUser(), business);
                            if (followLink != null) {
                                businessToDisplayDTO.setFollowing(true);
                                businessToDisplayDTO.setFollowingFrom(dozerService.map(followLink.getFollowedFrom(), Date.class));
                                businessToDisplayDTO.setFollowingNotification(followLink.getFollowingNotification());
                            }
                        }
                        businessToDisplayDTO.setTotalFollowers(followLinkService.countByBusiness(business));

                        //order gallery
                        Collections.sort(businessToDisplayDTO.getGalleryPictures());
                    }
                }
            }
        }

        switch (orderType) {

            case NAME:
                Collections.sort(finalResult, new Comparator<BusinessToDisplayDTO>() {
                    @Override
                    public int compare(BusinessToDisplayDTO o1, BusinessToDisplayDTO o2) {
                        return StringUtil.normalize(o1.getName()).compareTo(StringUtil.normalize(o2.getName()));
                    }
                });
                break;
            case DISTANCE:


                Collections.sort(finalResult, new Comparator<BusinessToDisplayDTO>() {
                    @Override
                    public int compare(BusinessToDisplayDTO o1, BusinessToDisplayDTO o2) {
                        return o1.getDistance().compareTo(o2.getDistance());
                    }
                });
                break;
        }

        return finalResult;

    }

    private List<AbstractPublicationDTO> finalize(Position position, List<AbstractPublication> publications) {
        return finalize(position, publications, new Date().getTime());
    }


    private static class SearchElement {

        private Pattern pattern  = Pattern.compile("^(([^:]*):)?([^:]*)$");
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

    private void createCategorySearchResult(List<BusinessCategory> categories, SearchDTO searchDTO, SearchResultDTO searchResultDTO, int page, boolean onlyOneResult, boolean targetedCategory) {

        Position position = extractPosition(searchDTO.getPosition());

        for (BusinessCategory category : categories) {

            boolean lastLevelCategory = category.getChildren().size() == 0;
            if (lastLevelCategory && onlyOneResult) {
                //TODO load 20 + by scrolling
                List<Business> businesses = businessService.findByCategory(category, page, 20);
                List<BusinessToDisplayDTO> businessToDisplayDTOs = finalizeBusiness(position, businesses, OrderType.NAME);

                completeCategoryMap(true, searchResultDTO, category, businessToDisplayDTOs);

            } else if (lastLevelCategory) {

                List<Business> businesses = businessService.findByCategory(category, 0, 4);
                List<BusinessToDisplayDTO> businessToDisplayDTOs = finalizeBusiness(position, businesses, OrderType.NAME);

                completeCategoryMap(targetedCategory, searchResultDTO, category, businessToDisplayDTOs);
            } else {
                BusinessCategoryDTO sCat = null;
                BusinessCategoryDTO cat = null;
                if (category.getParent() != null) {
                    sCat = dozerService.map(category, BusinessCategoryDTO.class);
                    cat = dozerService.map(category.getParent(), BusinessCategoryDTO.class);
                } else {
                    cat = dozerService.map(category, BusinessCategoryDTO.class);
                }
                if (!searchResultDTO.getCategoriesMap().containsKey(cat.getTranslationName())) {
                    searchResultDTO.getCategoriesMap().put(cat.getTranslationName(), new HashMap<>());
                }
                if (sCat != null && !searchResultDTO.getCategoriesMap().get(cat.getTranslationName()).containsKey(sCat.getTranslationName())) {
                    searchResultDTO.getCategoriesMap().get(cat.getTranslationName()).put(sCat.getTranslationName(), new HashMap<>());
                }
                createCategorySearchResult(category.getChildren(), searchDTO, searchResultDTO, page, onlyOneResult, false);
            }
        }
    }

    private void completeCategoryMap(
            boolean forceAdding,
            SearchResultDTO searchResultDTO,
            BusinessCategory category,
            List<BusinessToDisplayDTO> businessToDisplayDTOs) {

        if (businessToDisplayDTOs.size() == 0 && !forceAdding) {
            return;
        }

        BusinessCategoryDTO ssCat = dozerService.map(category, BusinessCategoryDTO.class);
        BusinessCategoryDTO sCat = dozerService.map(category.getParent(), BusinessCategoryDTO.class);
        BusinessCategoryDTO cat = dozerService.map(category.getParent().getParent(), BusinessCategoryDTO.class);

        //map level final
        if (!searchResultDTO.getCategoriesMap().containsKey(cat.getTranslationName())) {
            searchResultDTO.getCategoriesMap().put(cat.getTranslationName(), new HashMap<>());
        }
        if (!searchResultDTO.getCategoriesMap().get(cat.getTranslationName()).containsKey(sCat.getTranslationName())) {
            searchResultDTO.getCategoriesMap().get(cat.getTranslationName()).put(sCat.getTranslationName(), new HashMap<>());
        }
        if (!searchResultDTO.getCategoriesMap().get(cat.getTranslationName()).get(sCat.getTranslationName()).containsKey(ssCat.getTranslationName())) {
            searchResultDTO.getCategoriesMap().get(cat.getTranslationName()).get(sCat.getTranslationName()).put(ssCat.getTranslationName(), businessToDisplayDTOs);
        } else {
            searchResultDTO.getCategoriesMap().get(cat.getTranslationName()).get(sCat.getTranslationName()).get(ssCat.getTranslationName()).addAll(businessToDisplayDTOs);
        }
    }

    public static enum OrderType {
        NAME, DISTANCE
    }


    private Position extractPosition(PositionDTO dto) {
        Position position;

        if (dto.getX() == null || dto.getY() == null) {
            position = Constant.DEFAULT_POSITION;
        } else {
            position = dozerService.map(dto, Position.class);
        }

        return position;
    }

    private Position extractPosition() {
        return extractPosition(extractDTOFromRequest(PositionDTO.class));
    }

}
