package be.lynk.server.controller.rest;

import be.lynk.server.dto.*;
import be.lynk.server.model.Position;
import be.lynk.server.model.SearchCriteriaEnum;
import be.lynk.server.model.entities.*;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.*;
import be.lynk.server.util.AccountTypeEnum;
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
    public Result getBusiness(long id) {

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        Business byId = businessService.findById(id);

        List<AbstractPublication> publications = byId.getPublications();

        return ok(new ListDTO<>(dozerService.map(publications, AbstractPublicationDTO.class)));
    }


    @Transactional
    public Result getByDefault() {

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        List<AbstractPublication> publications = publicationService.findActivePublication();

        ListDTO<AbstractPublicationDTO> abstractPublicationDTOListDTO = new ListDTO<>(finalize(dto, publications));

        return ok(abstractPublicationDTOListDTO);
    }

    @Transactional
    public Result getByFollowed() {

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);


        Account currentUser = securityController.getCurrentUser();
        List<Business> byAccount = followLinkService.findBusinessByAccount(currentUser);


        List<AbstractPublication> finalList = publicationService.findActivePublicationByBusinesses(byAccount);


        return ok(new ListDTO<>(finalize(dto, finalList)));
    }


    @Transactional
    public Result getByInterest(long id) {

        //load interest
        CustomerInterest byId = customerInterestService.findById(id);

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        List<AbstractPublication> publications = publicationService.findActivePublication();

        List<AbstractPublication> finalList = new ArrayList<>();

        //sort
        for (AbstractPublication publication : publications) {
            for (BusinessCategory businessCategory : publication.getBusiness().getBusinessCategories()) {
                for (CategoryInterestLink categoryInterestLink : businessCategory.getLinks()) {
                    if (categoryInterestLink.getCustomerInterest().equals(byId)) {
                        finalList.add(publication);
                        break;
                    }
                }
            }

        }


        return ok(new ListDTO<>(finalize(dto, finalList)));
    }

    @Transactional
    public Result getByString() {
        return getByString(false);
    }

    @Transactional
    public Result getByStringLittle() {
        return getByString(true);
    }


    private Result getByString(boolean min) {

        SearchDTO searchDTO = extractDTOFromRequest(SearchDTO.class);

        List<AbstractPublication> finalList = new ArrayList<>();

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
                        searchResultDTO.setCategories(dozerService.map(businessCategoryService.search(searchElement.getText(), lang()), BusinessCategoryLittleDTO.class));
                        break;
                    case BUSINESS:
                        searchResultDTO.setBusinesses(dozerService.map(businessService.search(searchElement.getText()), BusinessDTO.class));
                        break;
                    case PUBLICATION:
                        searchResultDTO.setPublications(finalize(searchDTO.getPosition(), publicationService.search(searchElement.getText())));
                        break;
                }
            }
        } else {

            searchResultDTO.setCategories(dozerService.map(businessCategoryService.search(searchElement.getText(), lang()), BusinessCategoryLittleDTO.class));
            searchResultDTO.setBusinesses(dozerService.map(businessService.search(searchElement.getText()), BusinessDTO.class));
            searchResultDTO.setPublications(finalize(searchDTO.getPosition(), publicationService.search(searchElement.getText())));
        }

        return ok(searchResultDTO);
    }


    private List<AbstractPublicationDTO> finalize(PositionDTO dto, List<AbstractPublication> publications) {
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

            Map<Business, Long> addressLongMap = localizationService.distanceBetweenAddresses(dozerService.map(dto, Position.class), addresses);

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
                            if (account.getType().equals(AccountTypeEnum.CUSTOMER)) {
                                publicationDTO.setFollowing(followLinkService.testByAccountAndBusiness(account, publication.getBusiness()));
                            }
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


}
