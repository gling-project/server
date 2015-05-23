package be.lynk.server.controller.rest;

import be.lynk.server.controller.EmailController;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.dto.post.*;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.*;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.KeyGenerator;
import be.lynk.server.util.message.ErrorMessageEnum;
import be.lynk.server.util.exception.MyRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Results;

import java.util.HashSet;

/**
 * Created by florian on 25/03/15.
 * This class is used to connect / register / logout an account.
 * Functions doesn't required an authentication.
 */
@org.springframework.stereotype.Controller
public class LoginRestController extends AbstractRestController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private EmailController emailController;
    @Autowired
    private FacebookCredentialService facebookCredentialService;
    @Autowired
    private LoginCredentialService loginCredentialService;
    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private BusinessCategoryService businessCategoryService;
    @Autowired
    private StoredFileService storedFileService;

    @Transactional
    public Result forgotPassword(){

        ForgotPasswordDTO dto = extractDTOFromRequest(ForgotPasswordDTO.class);

        Account byEmail = accountService.findByEmail(dto.getEmail());

        if(byEmail==null){
            throw new MyRuntimeException(ErrorMessageEnum.EMAIL_UNKNOWN);
        }
        if(byEmail.getLoginCredential()==null){
            throw new MyRuntimeException(ErrorMessageEnum.ACCOUNT_WITHOUT_LOGIN_CREDENTIAL);
        }

        byEmail.getLoginCredential().setPassword(KeyGenerator.generateRandomPassword());

        //send email
        emailController.sendNewPasswordEmail(byEmail);

        accountService.saveOrUpdate(byEmail);

        return ok(new ResultDTO());
    }

    @Transactional
    public Result testEmail(String email) {
        return ok(new BooleanDTO(accountService.findByEmail(email) != null));
    }

    @Transactional
    public Result testFacebookAccount() {

        FacebookAuthenticationDTO dto = extractDTOFromRequest(FacebookAuthenticationDTO.class);

        return ok(testFacebookAccount(dto));
    }


    @Transactional
    public Result loginFacebook() {

        //extract DTO
        FacebookAuthenticationDTO dto = extractDTOFromRequest(FacebookAuthenticationDTO.class);

        //authentication
        FacebookTokenAccessControlDTO facebookTokenAccessControlDTO = facebookCredentialService.controlFacebookAccess(dto.getToken());
        if (!facebookTokenAccessControlDTO.getId().equals(dto.getUserId())) {
            throw new MyRuntimeException(ErrorMessageEnum.FACEBOOK_AUTHENTICATION_FAIL);
        }

        //control
        FacebookCredential facebookCredential = facebookCredentialService.findByUserId(dto.getUserId());
        Account account;

        if (facebookCredential == null) {
            throw new MyRuntimeException(ErrorMessageEnum.FACEBOOK_NOT_ACCOUNT_FOUND);
        }
        account = facebookCredential.getAccount();

        return ok(finalizeConnection(account));
    }

    @Transactional
    public Result fusion() {

        AccountFusionDTO dto = extractDTOFromRequest(AccountFusionDTO.class);

        //load account
        Account account = accountService.findByEmail(dto.getEmail());
        if (account == null) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
        }

        //existing account
        if (account.getLoginCredential() != null) {
            //control password
            if (!loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }

            //control facebook
            FacebookTokenAccessControlDTO facebookTokenAccessControlDTO = facebookCredentialService.controlFacebookAccess(dto.getFacebookToken());
            if (!facebookTokenAccessControlDTO.getId().equals(dto.getFacebookUserId())) {
                throw new MyRuntimeException(ErrorMessageEnum.FACEBOOK_AUTHENTICATION_FAIL);
            }

            //fusion !
            FacebookCredential facebookCredential = new FacebookCredential();
            facebookCredential.setAccount(account);
            facebookCredential.setUserId(dto.getFacebookUserId());
            account.setFacebookCredential(facebookCredential);

            facebookCredentialService.saveOrUpdate(facebookCredential);
        } else {
            //??
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
        }

        //connection
        return ok(finalizeConnection(account));
    }

    /**
     * try to connect the user to an account with the password / email
     * expected the LoginDTO as Json data
     * Return an exception is the email / password doesn't correspond of any account
     *
     * @return a Login is the credential are valid and store the account into the context.
     * Create also a session
     */
    @Transactional
    public Result login() {

        //extract DTO
        LoginDTO dto = extractDTOFromRequest(LoginDTO.class);

        //control account
        Account account = accountService.findByEmail(dto.getEmail());

        if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
            //if there is no account for this email or the password doesn't the right, throw an exception
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
        }

        if(dto.getKeepSessionOpen()==null){
            dto.setKeepSessionOpen(false);
        }

        if (!dto.getKeepSessionOpen().equals(account.getLoginCredential().isKeepSessionOpen())) {
            account.getLoginCredential().setKeepSessionOpen(dto.getKeepSessionOpen());
            accountService.saveOrUpdate(account);
        }

        return ok(finalizeConnection(account));
    }

    @Transactional
    public Result businessRegistration() {
        BusinessRegistrationDTO dto = extractDTOFromRequest(BusinessRegistrationDTO.class);

        BusinessAccount account = (BusinessAccount) createNewAccount(dto.getAccountRegistration(), dto.getFacebookAuthentication(), false);
        account.setRole(RoleEnum.BUSINESS);

        //business
        Business business = dozerService.map(dto.getBusiness(), Business.class);
        //TODO temp
        business.getAddress().setCountry("BELGIUM");

        //add categories
        business.setBusinessCategories(new HashSet<>());
        for (BusinessCategoryDTO businessCategoryDTO : dto.getBusiness().getBusinessCategories()) {
            business.getBusinessCategories().add(businessCategoryService.findByName(businessCategoryDTO.getName()));
        }

        account.setBusiness(business);
        business.setAccount(account);

        //send email
        emailController.sendApplicationRegistrationBusinessEmail(account);

        accountService.saveOrUpdate(account);

        //return
        return ok(finalizeConnection(account));
    }

    /**
     * Register a new account with data contain into the RegistrationDTO
     *
     * @return Return an exception if the email is already used
     * Create a account, session, store the account into the session and return a LoginSuccess if already is ok
     */
    @Transactional
    public Result customerRegistration() {

        CustomerRegistrationDTO dto = extractDTOFromRequest(CustomerRegistrationDTO.class);

        CustomerAccount account = (CustomerAccount) createNewAccount(dto.getAccountRegistration(), dto.getFacebookAuthentication(), true);
        account.setRole(RoleEnum.CUSTOMER);

        //address ?
        if (dto.getAddress() != null) {
            Address address = dozerService.map(dto.getAddress(), Address.class);
            //TODO temp
            address.setCountry("BELGIUM");

            account.getAddresses().add(address);
        }

        //interest  ?
        if (dto.getCustomerInterests() != null) {
            for (CustomerInterestDTO customerInterestDTO : dto.getCustomerInterests()) {
                account.getCustomerInterests().add(customerInterestService.findByName(customerInterestDTO.getName()));
            }
        }

        //send email
        emailController.sendApplicationRegistrationCustomerEmail(account);

        accountService.saveOrUpdate(account);

        return ok(finalizeConnection(account));

    }

    /**
     * remove the account of the context
     *
     * @return a redirection to the home page
     */
    @Transactional
    public Result logout() {
        securityController.logout(Controller.ctx());
        return Results.redirect("/");
    }

    @Transactional
    public Result changeLanguage(String code) {


        Lang lang = Lang.forCode(code);
        if (lang != null) {
            changeLang(lang.code());
        }


        return ok(new ResultDTO());
    }

    private MyselfDTO finalizeConnection(Account account) {

        sessionService.saveOrUpdate(new Session(account, securityController.getSource(Controller.ctx())));

        //build success dto
        MyselfDTO myselfDTO = dozerService.map(account, MyselfDTO.class);
        myselfDTO.setFacebookAccount(account.getFacebookCredential() != null);
        myselfDTO.setLoginAccount(account.getLoginCredential() != null);
        myselfDTO.setAuthenticationKey(account.getAuthenticationKey());

        //storage
        securityController.storeAccount(Controller.ctx(), account);

        return myselfDTO;
    }

    private TestFacebookDTO testFacebookAccount(FacebookAuthenticationDTO facebookAuthenticationDTO) {

        TestFacebookDTO testFacebookDTO = new TestFacebookDTO();

        //authentication
        FacebookTokenAccessControlDTO facebookTokenAccessControlDTO = facebookCredentialService.controlFacebookAccess(facebookAuthenticationDTO.getToken());
        if (!facebookTokenAccessControlDTO.getId().equals(facebookAuthenticationDTO.getUserId())) {
            throw new MyRuntimeException(ErrorMessageEnum.FACEBOOK_AUTHENTICATION_FAIL);
        }

        testFacebookDTO.setFacebookTokenAccessControl(facebookTokenAccessControlDTO);

        //control
        FacebookCredential facebookCredential = facebookCredentialService.findByUserId(facebookAuthenticationDTO.getUserId());

        if (facebookCredential != null) {
            Account account = facebookCredential.getAccount();
            testFacebookDTO.setStatus(TestFacebookDTO.TestFacebookStatusEnum.ALREADY_REGISTRERED);
            testFacebookDTO.setMyself(finalizeConnection(account));
        } else if (accountService.findByEmail(facebookTokenAccessControlDTO.getEmail()) != null) {
            //an existing account with same email
            //fusion
            Account account = accountService.findByEmail(facebookTokenAccessControlDTO.getEmail());
            if (((account instanceof BusinessAccount) && facebookAuthenticationDTO.getAccountType().equals(AccountTypeEnum.BUSINESS)) ||
                    ((account instanceof CustomerAccount) && facebookAuthenticationDTO.getAccountType().equals(AccountTypeEnum.CUSTOMER))) {

                AccountFusionDTO accountFusion = new AccountFusionDTO();
                accountFusion.setFacebookToken(facebookAuthenticationDTO.getToken());
                accountFusion.setEmail(facebookTokenAccessControlDTO.getEmail());
                accountFusion.setFacebookUserId(facebookAuthenticationDTO.getUserId());
                testFacebookDTO.setAccountFusion(accountFusion);
                testFacebookDTO.setStatus(TestFacebookDTO.TestFacebookStatusEnum.ACCOUNT_WITH_SAME_EMAIL);
            }
            throw new MyRuntimeException(ErrorMessageEnum.FACEBOOK_FUSION_DIFFERENT_ACCOUNT_TYPE);
        } else {
            testFacebookDTO.setStatus(TestFacebookDTO.TestFacebookStatusEnum.OK);
        }


        return testFacebookDTO;

    }

    private Account createNewAccount(AccountRegistrationDTO accountRegistrationDTO, FacebookAuthenticationDTO facebookAuthentication, boolean isCustomer) {
        //Control email
        if (accountService.findByEmail(accountRegistrationDTO.getEmail()) != null) {
            throw new MyRuntimeException(ErrorMessageEnum.EMAIL_ALREADY_USED);
        }

        //account
        Account account;
        if (isCustomer) {
            CustomerAccount customerAccount = dozerService.map(accountRegistrationDTO, CustomerAccount.class);
            account = customerAccount;
        } else {
            account = dozerService.map(accountRegistrationDTO, BusinessAccount.class);
        }
        account.setId(null);
        if (account.getLang() == null) {
            account.setLang(Controller.lang());
        }


        if (accountRegistrationDTO.getLang() != null) {
            Controller.changeLang(accountRegistrationDTO.getLang().getCode());
        }

        //credential
        if (facebookAuthentication != null) {
            TestFacebookDTO result = testFacebookAccount(facebookAuthentication);
            if (result.getStatus().equals(TestFacebookDTO.TestFacebookStatusEnum.ACCOUNT_WITH_SAME_EMAIL)) {
                //TODO test fusion
            } else if (result.getStatus().equals(TestFacebookDTO.TestFacebookStatusEnum.ALREADY_REGISTRERED)) {
                //TODO ??
            } else {
                //continue
                account.setFacebookCredential(new FacebookCredential(account, facebookAuthentication.getUserId()));

                account.setEmail(result.getFacebookTokenAccessControl().getEmail());
                account.setFirstname(result.getFacebookTokenAccessControl().getFirst_name());
                account.setLastname(result.getFacebookTokenAccessControl().getLast_name());
                account.setMale(result.getFacebookTokenAccessControl().getGender().equals("male"));

                //lang
                //priority to the facebook language
                for (Lang lang : Lang.availables()) {
                    if (result.getFacebookTokenAccessControl().getLocale().equals(lang.code())) {
                        account.setLang(lang);
                        break;
                    }
                }
                //choose the current interface lang
                if (account.getLang() != null) {
                    if (accountRegistrationDTO.getLang() != null) {
                        changeLang(accountRegistrationDTO.getLang().getCode());
                        account.setLang(dozerService.map(accountRegistrationDTO.getLang(), Lang.class));
                    }
                    if (account.getLang() != null) {
                        account.setLang(lang());
                    }
                }
            }
        } else {
            account.setLoginCredential(new LoginCredential(account, accountRegistrationDTO.getKeepSessionOpen(), accountRegistrationDTO.getPassword()));
        }

        return account;
    }

}
