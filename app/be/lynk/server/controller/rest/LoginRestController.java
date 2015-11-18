package be.lynk.server.controller.rest;

import be.lynk.server.controller.EmailController;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.dto.post.AccountRegistrationDTO;
import be.lynk.server.dto.post.BusinessRegistrationDTO;
import be.lynk.server.dto.post.ForgotPasswordDTO;
import be.lynk.server.dto.post.LoginDTO;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.GenderEnum;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.*;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.KeyGenerator;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.httpRequest.FacebookRequest;
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
    @Autowired
    private FacebookRequest           facebookRequest;

    /* ////////////////////////////////////////////////////
     * CREATE FUNCTION
     /////////////////////////////////////////////////// */

    /**
     * login with facebook
     * if the accessToken come from a user already registered into Gling, loggin him
     * if not, create a new customer account
     * fail if the email of the user cannot be catch from facebook
     * Send an email if an account is created
     *
     * @param facebookToken the facebook token of the user
     * @param userId        the userId => TODO not use currently
     * @return MyselfDTO
     */
    @Transactional
    public Result loginFacebook(String facebookToken, String userId) {

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

            //the user is logged ?
            if (securityController.isAuthenticated(ctx())) {
                //fusion !
                account = securityController.getCurrentUser();
                account.setFacebookCredential(facebookCredential);
                facebookCredential.setAccount(account);

                //save
                accountService.saveOrUpdate(account);

            } else {


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

        }

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

        AccountRegistrationDTO accountDTO = initialization(AccountRegistrationDTO.class);
        Account account = createNewAccount(accountDTO);
        account.setRole(RoleEnum.CUSTOMER);

        //send email
        emailController.sendApplicationRegistrationCustomerEmail(account);

        accountService.saveOrUpdate(account);

        return ok(finalizeConnection(account));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result createBusiness() {

        if (securityController.getCurrentUser().getBusiness() != null) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_CUSTOMER_TO_BUSINESS_ALREADY_BUSINESS);
        }

        CreateBusinessDTO createBusinessDTO = initialization(CreateBusinessDTO.class);

        //load account
        Account account = accountService.findById(createBusinessDTO.getAccountId());

        account.setRole(RoleEnum.BUSINESS);
        account.setType(AccountTypeEnum.BUSINESS);
        account.setBusiness(new Business(account, createBusinessDTO.getBusinessName()));

        accountService.saveOrUpdate(account);

        return ok(finalizeConnection(account));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result createBusinessFromFacebook(String facebookUrl) {

        if (securityController.getCurrentUser().getBusiness() != null) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_CUSTOMER_TO_BUSINESS_ALREADY_BUSINESS);
        }

        Account account = securityController.getCurrentUser();

        facebookRequest.createBusinessFromFacebook(account, facebookUrl, true);

        account.setRole(RoleEnum.BUSINESS);
        account.setType(AccountTypeEnum.BUSINESS);

        accountService.saveOrUpdate(account);

        return ok(finalizeConnection(securityController.getCurrentUser()));
    }


    /* ////////////////////////////////////////////////////
     * UPDATE FUNCTION
     /////////////////////////////////////////////////// */

    /**
     * generate a new email and send a mail with this new password
     * fail if the email is not knows or this user doesn't use credential for loggin
     * Expect : ForgotPasswordDTO
     *
     * @return nothing
     */
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

    /**
     * change the language of the server. If the user if logged, change also his language
     *
     * @param code
     * @return
     */
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
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result linkFacebook(String facebookToken, String user_id) {

        //authentication
        FacebookTokenAccessControlDTO facebookTokenAccessControlDTO = facebookCredentialService.controlFacebookAccess(facebookToken);

        //control
        FacebookCredential facebookCredential = facebookCredentialService.findByUserId(facebookTokenAccessControlDTO.getId());

        if (facebookCredential != null) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_LOGIN_FACEBOOK_LINK_ALREADY_USED);
        }

        //link
        if (securityController.getCurrentUser().getFacebookCredential() != null) {
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_LOGIN_FACEBOOK_LINK_ALREADY_LINKED);
        }

        Account currentUser = securityController.getCurrentUser();
        facebookCredential = dozerService.map(facebookTokenAccessControlDTO, FacebookCredential.class);
        facebookCredential.setAccount(currentUser);
        currentUser.setFacebookCredential(facebookCredential);

        accountService.saveOrUpdate(currentUser);

        return ok(finalizeConnection(currentUser));
    }

    /* ////////////////////////////////////////////////////
     * READ FUNCTION
     /////////////////////////////////////////////////// */

    /**
     * Return a boolean : true if the email is already used, else false
     *
     * @param email
     * @return
     */
    @Transactional
    public Result testEmail(String email) {
        return ok(new BooleanDTO(accountService.findByEmail(email) != null));
    }

    /**
     * test an address through google map. return a badRequest if the address cannot be catch by GoogleMap
     * Expect : AddressDTO
     *
     * @return nothing
     */
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

    /* ////////////////////////////////////////////////////
     * PRIVATE FUNCTION
     /////////////////////////////////////////////////// */

    @Transactional
    @SecurityAnnotation(role = RoleEnum.BUSINESS)
    public Result getBusinessData() {
        return ok(finalizeConnection(securityController.getCurrentUser()));
    }

    private DTO finalizeConnection(Account account) {

//        forBusinessApplication=true;


        sessionService.saveOrUpdate(new Session(account, securityController.getSource(ctx())));

        MyselfDTO myselfDTO = accountToMyself(account);


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

    private Account createNewAccount(AccountRegistrationDTO accountDTO) {

        //Control email
        if (accountService.findByEmail(accountDTO.getEmail()) != null) {
            throw new MyRuntimeException(ErrorMessageEnum.EMAIL_ALREADY_USED);
        }

        //account
        Account account = dozerService.map(accountDTO, Account.class);
        account.setRole(RoleEnum.CUSTOMER);
        account.setType(AccountTypeEnum.CUSTOMER);


        //define a language
        if (account.getLang() == null) {
            account.setLang(lang());
        }

        //credential
        account.setLoginCredential(new LoginCredential(account, accountDTO.getPassword()));

        return account;
    }

    private String generateEncryptingPassword(final String password) {
        return new StrongPasswordEncryptor().encryptPassword(password);
    }

}
