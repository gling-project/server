package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusAnnotation;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.admin.*;
import be.lynk.server.dto.post.LoginDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.importer.CategoryImporter;
import be.lynk.server.importer.DemoImporter;
import be.lynk.server.model.email.EmailMessage;
import be.lynk.server.model.entities.*;
import be.lynk.server.mongoService.MongoSearchService;
import be.lynk.server.service.*;
import be.lynk.server.service.impl.CustomerInterestServiceImpl;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.ContactTargetEnum;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.httpRequest.FacebookRequest;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Created by florian on 5/07/15.
 */
@org.springframework.stereotype.Controller
public class SuperAdminRestController extends AbstractRestController {

    @Autowired
    private BusinessService             businessService;
    @Autowired
    private AccountService              accountService;
    @Autowired
    private LoginCredentialService      loginCredentialService;
    @Autowired
    private CategoryImporter            categoryImporter;
    @Autowired
    private DemoImporter                demoImporter;
    @Autowired
    private CustomerInterestServiceImpl customerInterestService;
    @Autowired
    private BusinessCategoryService     businessCategoryService;
    @Autowired
    private CategoryInterestLinkService categoryInterestLinkService;
    @Autowired
    private PublicationService          publicationService;
    @Autowired
    private MongoSearchService          mongoSearchService;
    @Autowired
    private EmailService                emailService;
    @Autowired
    private FacebookRequest             facebookRequest;
    @Autowired
    private LocalizationService         localizationService;
    @Autowired
    private FileService                 fileService;
    @Autowired
    private ClaimBusinessService        claimBusinessService;
    @Autowired
    private BusinessNotificationRestController businessNotificationRestController;
    @Autowired
    private PromotionRestController promotionRestController;


    @Transactional
    public Result generateFakePublications() {
        Account account;
        if (!securityController.isAuthenticated(ctx())) {
            //extract DTO
            LoginDTO dto = initialization(LoginDTO.class);

            account = accountService.findByEmail(dto.getEmail());

            if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                //if there is no account for this email or the password doesn't the right, throw an exception
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }
        } else {
            account = securityController.getCurrentUser();
        }
        if (!account.getRole().equals(RoleEnum.SUPERADMIN)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        return ok(demoImporter.generateFakePublications());
    }

    @Transactional
    public Result importDemoDate() {

        Account account;
        if (!securityController.isAuthenticated(ctx())) {
            //extract DTO
            LoginDTO dto = initialization(LoginDTO.class);

            account = accountService.findByEmail(dto.getEmail());

            if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                //if there is no account for this email or the password doesn't the right, throw an exception
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }
        } else {
            account = securityController.getCurrentUser();
        }
        if (!account.getRole().equals(RoleEnum.SUPERADMIN)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        return ok(demoImporter.importStart(true));
    }

    @Transactional
    public Result importCategory() {

        Account account;
        if (!securityController.isAuthenticated(ctx())) {
            //extract DTO
            LoginDTO dto = initialization(LoginDTO.class);

            account = accountService.findByEmail(dto.getEmail());

            if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                //if there is no account for this email or the password doesn't the right, throw an exception
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }
        } else {
            account = securityController.getCurrentUser();
        }
        if (!account.getRole().equals(RoleEnum.SUPERADMIN)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        return ok(categoryImporter.importStart(true));
    }

    @Transactional
    public Result importCategoryTranslation() {

        Account account;
        if (!securityController.isAuthenticated(ctx())) {
            //extract DTO
            LoginDTO dto = initialization(LoginDTO.class);

            account = accountService.findByEmail(dto.getEmail());

            if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                //if there is no account for this email or the password doesn't the right, throw an exception
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }
        } else {
            account = securityController.getCurrentUser();
        }
        if (!account.getRole().equals(RoleEnum.SUPERADMIN)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        return ok(categoryImporter.importTranslation());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result confirmPublication(Long id) {


        Business business = businessService.findById(id);

        business.setBusinessStatus(BusinessStatusEnum.PUBLISHED);

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result confirmClaim(Long businessId,Long accountId) {

        Business business = businessService.findById(businessId);
        Account account = accountService.findById(accountId);

        ClaimBusiness claimBusiness = claimBusinessService.findByBusinessAndAccount(business,account);

        if(claimBusiness==null){
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_CONFIRM_CLAIM_BUSINESS_NOT_CLAIMED);
        }
        if(!business.getBusinessStatus().equals(BusinessStatusEnum.PUBLISHED)){
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_CONFIRM_CLAIM_BUSINESS_NOT_PUBLISHED);
        }

        business.setAccount(account);

        account.setRole(RoleEnum.BUSINESS);
        account.setType(AccountTypeEnum.BUSINESS);

        accountService.saveOrUpdate(account);

        claimBusinessService.removeByBusiness(business);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN_READER)
    public Result getClaimBusiness() {
        List<ClaimBusiness> all = claimBusinessService.findAll();

        return ok(new ListDTO<>(dozerService.map(all, ClaimBusinessDTO.class)));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN_READER)
    public Result getCustomerPositions() {
        List<PositionDTO> customerPosition = mongoSearchService.getCustomerPosition(LocalDateTime.of(2015, 10, 1, 00, 00));

        return ok(new ListDTO<>(customerPosition));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN_READER)
    public Result getInterestStats() {

        InterestStatDTO interestStatDTO = new InterestStatDTO();

        interestStatDTO.setFrom1(mongoSearchService.getInterestVisits(LocalDateTime.now().minusDays(1)));

        interestStatDTO.setFrom7(mongoSearchService.getInterestVisits(LocalDateTime.now().minusDays(7)));

        interestStatDTO.setFrom14(mongoSearchService.getInterestVisits(LocalDateTime.now().minusDays(14)));

        interestStatDTO.setFrom28(mongoSearchService.getInterestVisits(LocalDateTime.now().minusDays(28)));

        return ok(interestStatDTO);

    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN_READER)
    public Result getStats() {

        long t = new Date().getTime();

        AdminStatDTO adminStatDTO = new AdminStatDTO();

        Long nbCustomer = accountService.countByType(AccountTypeEnum.CUSTOMER);
        Long nbBusiness = businessService.countAll();
        Long nbTotalPublication = publicationService.countAll();
        int nbSessions = mongoSearchService.numberSessionsFrom(LocalDateTime.of(2015, 10, 10, 00, 00, 00));

        Logger.info("COMPUTE STAT 1 : "+(new Date().getTime() - t));


        //utilisateur
        adminStatDTO.getStats().put("Nombre de compte consommateurs", new AdminStatDTO.Data(nbCustomer));

        adminStatDTO.getStats().put("Nouveaux consommateurs 1 jour", AdminStatDTO.Data.createPercent(accountService.countByTypeFrom(AccountTypeEnum.CUSTOMER, LocalDateTime.now().minusDays(1)).doubleValue(), nbCustomer.doubleValue()));

        adminStatDTO.getStats().put("Nouveaux consommateurs 7 jours", AdminStatDTO.Data.createPercent(accountService.countByTypeFrom(AccountTypeEnum.CUSTOMER, LocalDateTime.now().minusDays(7)).doubleValue(), nbCustomer.doubleValue()));

        adminStatDTO.getStats().put("Nouveaux consommateurs 28 jours", AdminStatDTO.Data.createPercent(accountService.countByTypeFrom(AccountTypeEnum.CUSTOMER, LocalDateTime.now().minusDays(28)).doubleValue(), nbCustomer.doubleValue()));

        Logger.info("COMPUTE STAT 2 : "+(new Date().getTime() - t));

        //commerce
        adminStatDTO.getStats().put("Nombre de commerces", new AdminStatDTO.Data(nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces publiés", AdminStatDTO.Data.createPercent(businessService.countByStatus(BusinessStatusEnum.PUBLISHED), nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces ayant publié au moins une fois", AdminStatDTO.Data.createPercent(businessService.countAtLeastOnePublication(), nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces ayant au moins une publication active", AdminStatDTO.Data.createPercent(businessService.countAtLeastOneActivePublication(), nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces ayant publié au moins une fois depuis ces 7 derniers jours", AdminStatDTO.Data.createPercent(businessService.countAtLeastOnePublicationFrom(LocalDateTime.now().minusDays(7)), nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces ayant publié au moins une fois depuis ces 28 derniers jours", AdminStatDTO.Data.createPercent(businessService.countAtLeastOnePublicationFrom(LocalDateTime.now().minusDays(28)), nbBusiness));

        Logger.info("COMPUTE STAT 3 : "+(new Date().getTime() - t));

        //publication
        adminStatDTO.getStats().put("Nombre total de publications", new AdminStatDTO.Data(nbTotalPublication));

        adminStatDTO.getStats().put("Nombre de publications actives", AdminStatDTO.Data.createPercent(publicationService.countActive(), nbTotalPublication));

        adminStatDTO.getStats().put("Nouvelles publications depuis 1 jour", AdminStatDTO.Data.createPercent(publicationService.countActiveFrom(LocalDateTime.now().minusDays(1)), nbTotalPublication));

        adminStatDTO.getStats().put("Nouvelles publications depuis 7 jour", AdminStatDTO.Data.createPercent(publicationService.countActiveFrom(LocalDateTime.now().minusDays(7)), nbTotalPublication));

        adminStatDTO.getStats().put("Nouvelles publications depuis 28 jour", AdminStatDTO.Data.createPercent(publicationService.countActiveFrom(LocalDateTime.now().minusDays(28)), nbTotalPublication));

        Logger.info("COMPUTE STAT 4 : "+(new Date().getTime() - t));

        adminStatDTO.getStats().put("Nombre de session total", new AdminStatDTO.Data(nbSessions));

        adminStatDTO.getStats().put("Nombre de session depuis 1 jour", AdminStatDTO.Data.createPercent(mongoSearchService.numberSessionsFrom(LocalDateTime.now().minusDays(1)), nbSessions));

        adminStatDTO.getStats().put("Nombre de session depuis 7 jour", AdminStatDTO.Data.createPercent(mongoSearchService.numberSessionsFrom(LocalDateTime.now().minusDays(7)), nbSessions));

        adminStatDTO.getStats().put("Nombre de session depuis 28 jour", AdminStatDTO.Data.createPercent(mongoSearchService.numberSessionsFrom(LocalDateTime.now().minusDays(28)), nbSessions));

        Logger.info("COMPUTE STAT 5 : "+(new Date().getTime() - t));

        return ok(adminStatDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN_READER)
    public Result getCategoriesAndInterests() {

        List<BusinessCategoryWithInterestDTO> result = new ArrayList<>();
        List<BusinessCategory> all = businessCategoryService.findAll();

        for (BusinessCategory businessCategory : all) {

            BusinessCategoryWithInterestDTO dto = dozerService.map(businessCategory, BusinessCategoryWithInterestDTO.class);

            for (CategoryInterestLink categoryInterestLink : businessCategory.getLinks()) {
                CustomerInterestDTO customerInterestDTO = dozerService.map(categoryInterestLink.getCustomerInterest(), CustomerInterestDTO.class);
                dto.getInterests().add(new BusinessCategoryWithInterestDTO.InterestWithPriority(customerInterestDTO, categoryInterestLink.getPriority()));
            }

            result.add(dto);
        }

        CategoriesAndInterestsDTO categoriesAndInterestsDTO = new CategoriesAndInterestsDTO();
        categoriesAndInterestsDTO.setCategories(result);
        categoriesAndInterestsDTO.setInterests(dozerService.map(customerInterestService.findAll(), CustomerInterestDTO.class));

        return ok(categoriesAndInterestsDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN_READER)
    public Result getUserDetails() {


        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();

        userDetailsDTO.setToday(getUserDetails(LocalDateTime.now().minusDays(1)));

        userDetailsDTO.setWeek(getUserDetails(LocalDateTime.now().minusDays(7)));

        userDetailsDTO.setAll(getUserDetails(null));

        return ok(userDetailsDTO);
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN_READER)
    public Result getAllBusinesses() {
        List<Business> all = businessService.findAll();

        List<BusinessForAdminDTO> map = new ArrayList<>();

        for (Business business : all) {

            BusinessForAdminDTO businessDTO = dozerService.map(business, BusinessForAdminDTO.class);
            map.add(businessDTO);

            businessDTO.setTotalFollowers(followLinkService.countByBusiness(business));

            //add publication nb
            businessDTO.setNbPublication(publicationService.countByBusiness(business));
            businessDTO.setNbPublicationActive(publicationService.countActiveByBusiness(business));

            //is claimed
            businessDTO.setIsClaimed(claimBusinessService.isClaimed(business));

            //have owner
            businessDTO.setHasOwner(business.getAccount()!=null);

        }


        return ok(new ListDTO<>(map));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN_READER)
    public Result getClaimsByBusiness(long businessId) {

        Business byId = businessService.findById(businessId);

        List<ClaimBusiness> byBusiness = claimBusinessService.findByBusiness(byId);

        return ok(new ListDTO<>(dozerService.map(byBusiness,ClaimBusinessDTO.class)));
    }

    private UserDetailsBoxDTO getUserDetails(LocalDateTime from) {
        UserDetailsBoxDTO userDetailsBoxDTO = new UserDetailsBoxDTO();

        userDetailsBoxDTO.setList(mongoSearchService.generateUserHistory(from));
        userDetailsBoxDTO.setTotal(userDetailsBoxDTO.getList().size());

        //compute session nb
        for (UserHistoryDTO userHistoryDTO : userDetailsBoxDTO.getList()) {
            if (userDetailsBoxDTO.getNbSessions().containsKey(userHistoryDTO.getNbSessions())) {
                userDetailsBoxDTO.getNbSessions().put(userHistoryDTO.getNbSessions(), userDetailsBoxDTO.getNbSessions().get(userHistoryDTO.getNbSessions()) + 1);
            } else {
                userDetailsBoxDTO.getNbSessions().put(userHistoryDTO.getNbSessions(), 1);
            }
        }

        //compute follow nb
        for (UserHistoryDTO userHistoryDTO : userDetailsBoxDTO.getList()) {
            if (userDetailsBoxDTO.getNbFollows().containsKey(userHistoryDTO.getNbFollow())) {
                userDetailsBoxDTO.getNbFollows().put(userHistoryDTO.getNbFollow(), userDetailsBoxDTO.getNbFollows().get(userHistoryDTO.getNbFollow()) + 1);
            } else {
                userDetailsBoxDTO.getNbFollows().put(userHistoryDTO.getNbFollow(), 1);
            }
        }

        //compute follow nb
        for (UserHistoryDTO userHistoryDTO : userDetailsBoxDTO.getList()) {
            if (userDetailsBoxDTO.getNbAddresses().containsKey(userHistoryDTO.getNbAddresses())) {
                userDetailsBoxDTO.getNbAddresses().put(userHistoryDTO.getNbAddresses(), userDetailsBoxDTO.getNbAddresses().get(userHistoryDTO.getNbAddresses()) + 1);
            } else {
                userDetailsBoxDTO.getNbAddresses().put(userHistoryDTO.getNbAddresses(), 1);
            }
        }

        //sharePosition
        for (UserHistoryDTO userHistoryDTO : userDetailsBoxDTO.getList()) {
            if (userDetailsBoxDTO.getSharePositions().containsKey(userHistoryDTO.getSharePosition())) {
                userDetailsBoxDTO.getSharePositions().put(userHistoryDTO.getSharePosition(), userDetailsBoxDTO.getSharePositions().get(userHistoryDTO.getSharePosition()) + 1);
            } else {
                userDetailsBoxDTO.getSharePositions().put(userHistoryDTO.getSharePosition(), 1);
            }
        }


        Collections.sort(userDetailsBoxDTO.getList());

        return userDetailsBoxDTO;
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result setCategoryInterestLink(String categoryName, String interestName, String priorityS) {

        BusinessCategory businessCategory = businessCategoryService.findByName(categoryName);

        CustomerInterest customerInterest = customerInterestService.findByName(interestName);

        if (businessCategory == null || customerInterest == null) {
            throw new MyRuntimeException("interest or category not found : " + interestName + "/" + categoryName);
        }


        for (CategoryInterestLink categoryInterestLink : businessCategory.getLinks()) {
            if (categoryInterestLink.getCustomerInterest().equals(customerInterest)) {
                if (priorityS == null) {
                    businessCategory.getLinks().remove(categoryInterestLink);
                    businessCategoryService.saveOrUpdate(businessCategory);
                    customerInterest.getLinks().remove(categoryInterestLink);
                    customerInterestService.saveOrUpdate(customerInterest);
                    categoryInterestLinkService.remove(categoryInterestLink);
                    return ok();
                } else {
                    Integer priority = Integer.parseInt(priorityS);
                    categoryInterestLink.setPriority(priority);
                    categoryInterestLinkService.saveOrUpdate(categoryInterestLink);
                    return ok();
                }

            }
        }

        if (priorityS != null) {
            CategoryInterestLink categoryInterestLink = new CategoryInterestLink(businessCategory, customerInterest, Integer.parseInt(priorityS));
            categoryInterestLinkService.saveOrUpdate(categoryInterestLink);
        }

        return ok();
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result sendEmailToBusinesses() {

        EmailDTO emailDTO = initialization(EmailDTO.class);

        List<EmailMessage.Recipient> emails = new ArrayList<>();

        emails.add(new EmailMessage.Recipient(ContactTargetEnum.NO_REPLY.getEmail(), ContactTargetEnum.NO_REPLY.name()));

        for (Business business : businessService.findAll()) {
            if(business.getAccount()!=null) {
                emails.add(new EmailMessage.Recipient(business.getAccount(), EmailMessage.RecipientTypeEnum.BCC));
            }
        }

        EmailMessage emailMessage = new EmailMessage(ContactTargetEnum.HELP.getEmail(), emails, emailDTO.getSubject(), emailDTO.getMessage());

        //TODO temp change lang
        emailService.sendEmail(emailMessage, lang());
//
        return ok();
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result importBusiness(String facebookUrl) {

        facebookRequest.createBusinessFromFacebook(securityController.getCurrentUser(), facebookUrl, false);

        return ok();
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result createBusinessNotification(Long businessId) {
        BusinessNotificationDTO dto = initialization(BusinessNotificationDTO.class);

        Business business = businessService.findById(businessId);

        return businessNotificationRestController.create(dto,business);
    }
    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result createPromotion(Long businessId) {
        PromotionDTO dto = initialization(PromotionDTO.class);

        Business business = businessService.findById(businessId);

        return promotionRestController.create(dto,business);
    }
}
