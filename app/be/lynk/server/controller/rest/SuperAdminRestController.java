package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.admin.AdminStatDTO;
import be.lynk.server.dto.post.LoginDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.importer.CategoryImporter;
import be.lynk.server.importer.DemoImporter;
import be.lynk.server.model.entities.*;
import be.lynk.server.mongoService.MongoSearchService;
import be.lynk.server.service.*;
import be.lynk.server.service.impl.CustomerInterestServiceImpl;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    public Result getStats() {

        AdminStatDTO adminStatDTO = new AdminStatDTO();

        Long nbCustomer = accountService.countByType(AccountTypeEnum.CUSTOMER);

        //utilisateur
        adminStatDTO.getStats().put("Nombre de compte consommateurs", nbCustomer + "");

        adminStatDTO.getStats().put("Nouveaux consommateurs 1 jour", "+ " + accountService.countByTypeFrom(AccountTypeEnum.CUSTOMER, LocalDateTime.now().minusDays(1)));

        adminStatDTO.getStats().put("Nouveaux consommateurs 7 jours", "+ " + accountService.countByTypeFrom(AccountTypeEnum.CUSTOMER, LocalDateTime.now().minusDays(7)));

        //publication
        adminStatDTO.getStats().put("Nombre total de publications", publicationService.countAll() + "");

        adminStatDTO.getStats().put("Nombre de publications actives", publicationService.countActive() + "");

        adminStatDTO.getStats().put("Nouvelles publications depuis 1 jour", "+ " + publicationService.countActiveFrom(LocalDateTime.now().minusDays(1)));

        adminStatDTO.getStats().put("Nouvelles publications 7 jours", "+ " + publicationService.countActiveFrom(LocalDateTime.now().minusDays(7)));

        adminStatDTO.getStats().put("Nombre de session depuis 1 jour", "+ " + mongoSearchService.numberSessionsFrom(LocalDateTime.now().minusDays(1)));

        adminStatDTO.getStats().put("Nombre de session depuis 7 jours", "+ " + mongoSearchService.numberSessionsFrom(LocalDateTime.now().minusDays(7)));


        return ok(adminStatDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
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


}
