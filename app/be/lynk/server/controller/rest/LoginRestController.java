package be.lynk.server.controller.rest;

import be.lynk.server.controller.EmailController;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.businessApplication.LoginSuccessDTO;
import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.dto.post.*;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.GenderEnum;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.*;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.KeyGenerator;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Result;
import play.mvc.Results;

import java.util.ArrayList;

/**
 * Created by florian on 25/03/15.
 * This class is used to connect / register / logout an account.
 * Functions doesn't required an authentication.
 */
@org.springframework.stereotype.Controller
public class LoginRestController extends AbstractRestController {

    @Autowired
    private AccountService            accountService;
    @Autowired
    private SessionService            sessionService;
    @Autowired
    private EmailController           emailController;
    @Autowired
    private FacebookCredentialService facebookCredentialService;
    @Autowired
    private LoginCredentialService    loginCredentialService;
    @Autowired
    private CustomerInterestService   customerInterestService;
    @Autowired
    private BusinessCategoryService   businessCategoryService;
    @Autowired
    private StoredFileService         storedFileService;
    @Autowired
    private LocalizationService       localizationService;
    @Autowired
    private BusinessService           businessService;


    @Transactional
    public Result forgotPassword() {

        ForgotPasswordDTO dto = initialization(ForgotPasswordDTO.class);

        Account byEmail = accountService.findByEmail(dto.getEmail());

        if (byEmail == null) {
            throw new MyRuntimeException(ErrorMessageEnum.EMAIL_UNKNOWN);
        }
        if (byEmail.getLoginCredential() == null) {
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

//    @Transactional
//    public Result testFacebookAccount() {
//
//        FacebookAuthenticationDTO facebookAuthenticationDTO = initialization(FacebookAuthenticationDTO.class);
//
//        TestFacebookDTO testFacebookDTO = new TestFacebookDTO();
//
//        //1) load the data from facebook
//        FacebookTokenAccessControlDTO facebookTokenAccessControlDTO = facebookCredentialService.controlFacebookAccess(facebookAuthenticationDTO.getToken());
//        testFacebookDTO.setUserId(facebookTokenAccessControlDTO.getId());
//        testFacebookDTO.setFacebookTokenAccessControl(facebookTokenAccessControlDTO);
//        testFacebookDTO.setFirstname(facebookTokenAccessControlDTO.getFirst_name());
//        testFacebookDTO.setLastname(facebookTokenAccessControlDTO.getLast_name());
//        testFacebookDTO.setEmail(facebookTokenAccessControlDTO.getEmail());
//        testFacebookDTO.setGender(GenderEnum.getByText(facebookTokenAccessControlDTO.getGender()));
//
//        //2) test if there is an account with this facebook credential
//        FacebookCredential facebookCredential = facebookCredentialService.findByUserId(facebookTokenAccessControlDTO.getId());
//
//        if (facebookCredential != null) {
//            //founded ! the user is already registered
//            Account account = facebookCredential.getAccount();
//            testFacebookDTO.setStatus(TestFacebookDTO.TestFacebookStatusEnum.ALREADY_REGISTRERED);
//            testFacebookDTO.setMyself((MyselfDTO) finalizeConnection(account));
//
//        } else if (accountService.findByEmail(facebookTokenAccessControlDTO.getEmail()) != null) {
//
//            Account account = accountService.findByEmail(facebookTokenAccessControlDTO.getEmail());
//
//            facebookCredential = new FacebookCredential();
//            facebookCredential.setUserId(facebookTokenAccessControlDTO.getId());
//            facebookCredential.setAccount(account);
//            account.setFacebookCredential(facebookCredential);
//
//            accountService.saveOrUpdate(account);
//
//            return ok(finalizeConnection(account));
//
//
//        } else {
//            testFacebookDTO.setStatus(TestFacebookDTO.TestFacebookStatusEnum.OK);
//        }
//
//
//        return ok(testFacebookDTO);
//    }

    @Transactional
    public Result loginFacebookSimple(String facebookToken, String userId) {

        initialization();

        //authentication
        FacebookTokenAccessControlDTO facebookTokenAccessControlDTO = facebookCredentialService.controlFacebookAccess(facebookToken);

        //control
        FacebookCredential facebookCredential = facebookCredentialService.findByUserId(facebookTokenAccessControlDTO.getId());
        Account account;


        if (facebookCredential != null) {
            account = facebookCredential.getAccount();
        } else {
            //if the account doesn't exist, create one
            facebookCredential = new FacebookCredential();
            facebookCredential.setUserId(facebookTokenAccessControlDTO.getId());

            //test email : if the email is null, impossible to create an account
            if (facebookTokenAccessControlDTO.getEmail() == null) {
                throw new MyRuntimeException(ErrorMessageEnum.FACEBOOK_NO_EMAIL);
            }

            //Control email
            if (accountService.findByEmail(facebookTokenAccessControlDTO.getEmail()) != null) {
                //fusion !
                account = accountService.findByEmail(facebookTokenAccessControlDTO.getEmail());
                account.setFacebookCredential(facebookCredential);
                facebookCredential.setAccount(account);

                facebookCredentialService.saveOrUpdate(facebookCredential);
            } else {
                //create new account
                account = new Account();
                account.setEmail(facebookTokenAccessControlDTO.getEmail());
                account.setFirstname(facebookTokenAccessControlDTO.getFirst_name());
                account.setLastname(facebookTokenAccessControlDTO.getLast_name());
                account.setFacebookCredential(facebookCredential);
                account.setGender(GenderEnum.getByText(facebookTokenAccessControlDTO.getGender()));
                account.setRole(RoleEnum.CUSTOMER);
                facebookCredential.setAccount(account);

                //define a language
                if (facebookTokenAccessControlDTO.getLocale() != null) {
                    for (Lang lang : Lang.availables()) {
                        if (facebookTokenAccessControlDTO.getLocale().equals(lang.code())) {
                            account.setLang(lang);
                            break;
                        }
                    }
                } else {
                    account.setLang(Lang.forCode("fr"));
                }

                //change lang interface
                if (account.getLang() != null) {
                    account.setLang(lang());
                }
            }

            //send email
            emailController.sendApplicationRegistrationCustomerEmail(account);

            accountService.saveOrUpdate(account);

        }

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
        LoginDTO dto = initialization(LoginDTO.class);

        //control account
        Account account = accountService.findByEmail(dto.getEmail());

        if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
            //if there is no account for this email or the password doesn't the right, throw an exception
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
        }

        DTO result = finalizeConnection(account);

        return ok(result);
    }

    @Transactional
    public Result testAddress() {
        AddressDTO addressDTO = initialization(AddressDTO.class);
        Address address = dozerService.map(addressDTO, Address.class);
        //TODO temp
        address.setCountry("BELGIUM");

        //control address
        try {
            localizationService.validAddress(address);
        } catch (Exception e) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS);
        }

        return ok(new ResultDTO());
    }


    @Transactional
    public Result businessRegistration() {
        BusinessRegistrationDTO dto = initialization(BusinessRegistrationDTO.class);

        Account account =createNewAccount(dto.getAccountRegistration(), dto.getFacebookAuthentication(), false);
        account.setRole(RoleEnum.BUSINESS);

        //business
        Business business = dozerService.map(dto.getBusiness(), Business.class);
        business.setBusinessStatus(BusinessStatusEnum.NOT_PUBLISHED);
        //TODO temp
        business.getAddress().setCountry("BELGIUM");

        //control address
        try {
            localizationService.validAddress(business.getAddress());
        } catch (Exception e) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS);
        }

        //add categories
        business.setBusinessCategories(new ArrayList<>());
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

        CustomerRegistrationDTO dto = initialization(CustomerRegistrationDTO.class);

        Account account = createNewAccount(dto.getAccountRegistration(), dto.getFacebookAuthentication(), true);
        account.setRole(RoleEnum.CUSTOMER);

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
        securityController.logout(ctx());
        return Results.redirect("/");
    }

    @Transactional
    public Result changeLanguage(String code) {

        initialization();


        Lang lang = Lang.forCode(code);
        if (lang != null) {
            changeLang(lang.code());


            if (securityController.isAuthenticated(ctx())) {
                Account account = securityController.getCurrentUser();
                account.setLang(lang);
                accountService.saveOrUpdate(account);
            }
        }


        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result getBusinessData() {
        return ok(finalizeConnection(securityController.getCurrentUser()));
    }

    private DTO finalizeConnection(Account account) {

//        forBusinessApplication=true;


        sessionService.saveOrUpdate(new Session(account, securityController.getSource(ctx())));

        //build success dto
        MyselfDTO myselfDTO = dozerService.map(account, MyselfDTO.class);
        myselfDTO.setFacebookAccount(account.getFacebookCredential() != null);
        myselfDTO.setLoginAccount(account.getLoginCredential() != null);
        myselfDTO.setAuthenticationKey(account.getAuthenticationKey());
        if (account.getType() != null && account.getType().equals(AccountTypeEnum.BUSINESS)) {
            myselfDTO.setBusinessId(businessService.findByAccount(account).getId());
        }


        //storage
        securityController.storeAccount(ctx(), account);

        return myselfDTO;


    }

    private TestFacebookDTO testFacebookAccount(FacebookAuthenticationDTO facebookAuthenticationDTO) {

        TestFacebookDTO testFacebookDTO = new TestFacebookDTO();

        //1) load the data from facebook
        FacebookTokenAccessControlDTO facebookTokenAccessControlDTO = facebookCredentialService.controlFacebookAccess(facebookAuthenticationDTO.getToken());
        testFacebookDTO.setUserId(facebookTokenAccessControlDTO.getId());
        testFacebookDTO.setFacebookTokenAccessControl(facebookTokenAccessControlDTO);
        testFacebookDTO.setFirstname(facebookTokenAccessControlDTO.getFirst_name());
        testFacebookDTO.setLastname(facebookTokenAccessControlDTO.getLast_name());
        testFacebookDTO.setEmail(facebookTokenAccessControlDTO.getEmail());
        testFacebookDTO.setGender(GenderEnum.getByText(facebookTokenAccessControlDTO.getGender()));

        //2) test if there is an account with this facebook credential
        FacebookCredential facebookCredential = facebookCredentialService.findByUserId(facebookTokenAccessControlDTO.getId());

        if (facebookCredential != null) {
            //founded ! the user is already registered
            Account account = facebookCredential.getAccount();
            testFacebookDTO.setStatus(TestFacebookDTO.TestFacebookStatusEnum.ALREADY_REGISTRERED);
            testFacebookDTO.setMyself((MyselfDTO) finalizeConnection(account));

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
        Account account= dozerService.map(accountRegistrationDTO, Account.class);
        if(isCustomer){
            account.setRole(RoleEnum.CUSTOMER);
            account.setType(AccountTypeEnum.CUSTOMER);
        }
        else{
            account.setRole(RoleEnum.BUSINESS);
            account.setType(AccountTypeEnum.BUSINESS);
        }


        //define a language
        if (account.getLang() == null) {
            account.setLang(lang());
        }

        //credential
        if (facebookAuthentication != null) {

            //facebook credential
            //test facebook
            TestFacebookDTO result = testFacebookAccount(facebookAuthentication);
            if (result.getStatus().equals(TestFacebookDTO.TestFacebookStatusEnum.ACCOUNT_WITH_SAME_EMAIL)) {
                //TODO test fusion
            } else if (result.getStatus().equals(TestFacebookDTO.TestFacebookStatusEnum.ALREADY_REGISTRERED)) {
                //TODO ??
            } else {
                //continue
                account.setFacebookCredential(new FacebookCredential(account, facebookAuthentication.getUserId()));

                //lang
                //priority to the facebook language
                if (result.getFacebookTokenAccessControl().getLocale() != null) {
                    for (Lang lang : Lang.availables()) {
                        if (result.getFacebookTokenAccessControl().getLocale().equals(lang.code())) {
                            account.setLang(lang);
                            break;
                        }
                    }
                } else {
                    account.setLang(Lang.forCode("fr"));
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
            account.setLoginCredential(new LoginCredential(account, accountRegistrationDTO.getPassword()));
        }

        return account;
    }

    private String generateEncryptingPassword(final String password) {
        return new StrongPasswordEncryptor().encryptPassword(password);
    }

}
