package be.lynk.server.controller.technical.security;

import be.lynk.server.dto.technical.ExceptionDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.service.AccountService;
import be.lynk.server.service.impl.AccountServiceImpl;
import be.lynk.server.util.exception.RegularErrorException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import play.api.i18n.Lang;
import play.i18n.Messages;
import play.mvc.Http;
import play.mvc.Results;
import play.mvc.Security;
import play.mvc.SimpleResult;

/**
 * Created by florian on 10/11/14.
 */
@org.springframework.stereotype.Controller
public class CommonSecurityController extends Security.Authenticator {

    //recover the language into the http request
    public static final String REQUEST_HEADER_LANGUAGE                  = "language";
    //recover the email into the session
    public static final String SESSION_IDENTIFIER_STORE                 = "email";
    //name of the cookie for the automatic reconnection
    public static final String COOKIE_KEEP_SESSION_OPEN                 = "session_key";
    //name of the cookie for the automatic reconnection
    public static final String ACCOUNT_IDENTIFIER                       = "account_identifier";
    //recover the session key into the http request
    public static final String REQUEST_HEADER_AUTHENTICATION_KEY        = "authenticationKey";
    //recover the session key into the http request
    public static final String REQUEST_HEADER_SOURCE                    = "applicationSource";
    //error for failed authentication
    public static final String FAILED_AUTHENTICATION_CAUSE              = "FAILED_AUTHENTICATION_CAUSE";
    //error for wrong rights
    public static final String FAILED_AUTHENTICATION_CAUSE_WRONG_RIGHTS = "WRONG_RIGHT";

    //service
    @Autowired
    private final AccountService USER_SERVICE = new AccountServiceImpl();

    /**
     * two ways : by the session or by the authentication key into the http request
     *
     * @param ctx
     * @return
     */
    @Override
    public String getUsername(Http.Context ctx) {

        if (ctx.session().get(CommonSecurityController.SESSION_IDENTIFIER_STORE) == null) {

            String authenticationKey = ctx.request().getHeader(REQUEST_HEADER_AUTHENTICATION_KEY);

            if (authenticationKey == null) {
                return null;
            }

            //control authentication
            Account currentAccount = getCurrentUser();
            if (currentAccount == null) {
                return null;
            }

            ctx.changeLang(currentAccount.getLang().code());
            return currentAccount.getEmail();
        } else {
            return ctx.session().get(CommonSecurityController.SESSION_IDENTIFIER_STORE);
        }
    }


    /**
     * return the current user if the user is authenticated
     *
     * @return
     */
    public Account getCurrentUser() {

        //by session
        if (Http.Context.current().session().get(SESSION_IDENTIFIER_STORE) != null) {

            Account account = USER_SERVICE.findByEmail(Http.Context.current().session().get(SESSION_IDENTIFIER_STORE));
            if (!Http.Context.current().session().containsKey(ACCOUNT_IDENTIFIER)) {
                Http.Context.current().session().put(ACCOUNT_IDENTIFIER, account.getId() + "-" + account.getEmail());
            }
            return account;
        }

        //by request
        if (Http.Context.current().request().getHeader(REQUEST_HEADER_AUTHENTICATION_KEY) != null) {

            String  authentication = Http.Context.current().request().getHeader(REQUEST_HEADER_AUTHENTICATION_KEY);
            Account account        = USER_SERVICE.findByAuthenticationKey(authentication);
            if (account == null) {
                throw new RegularErrorException(ErrorMessageEnum.NOT_CONNECTED);
            }
            storeAccount(Http.Context.current(), account);
            if (!Http.Context.current().session().containsKey(ACCOUNT_IDENTIFIER)) {
                Http.Context.current().session().put(ACCOUNT_IDENTIFIER, account.getId() + "-" + account.getEmail());
            }
            return account;
        }

        //by coockie
        if (Http.Context.current().request().cookie(CommonSecurityController.COOKIE_KEEP_SESSION_OPEN) != null) {
            String key = Http.Context.current().request().cookie(CommonSecurityController.COOKIE_KEEP_SESSION_OPEN).value();

            String keyElements[] = key.split(":");

            Account account = USER_SERVICE.findById(Long.parseLong(keyElements[0]));

            if (account != null && USER_SERVICE.controlAuthenticationKey(keyElements[1], account)) {
                //connection
                storeAccount(Http.Context.current(), account);

                if (!Http.Context.current().session().containsKey(ACCOUNT_IDENTIFIER)) {
                    Http.Context.current().session().put(ACCOUNT_IDENTIFIER, account.getId() + "-" + account.getEmail());
                }
                return account;
            }

        }

        throw new RegularErrorException(ErrorMessageEnum.NOT_CONNECTED);
    }

    @Override
    public SimpleResult onUnauthorized(Http.Context ctx) {
        if (ctx.args.get(FAILED_AUTHENTICATION_CAUSE) == FAILED_AUTHENTICATION_CAUSE_WRONG_RIGHTS) {
            return Results.unauthorized(new ExceptionDTO(Messages.get(Lang.defaultLang(), ErrorMessageEnum.WRONG_AUTHORIZATION.name())));
        }
        return unauthorized(new ExceptionDTO(Messages.get(Lang.defaultLang(), ErrorMessageEnum.NOT_CONNECTED.name())));
    }

    /**
     * return true if the user is authenticated
     *
     * @param ctx
     * @return
     */
    public boolean isAuthenticated(Http.Context ctx) {

        try {
            if (getCurrentUser() != null) {
                return true;
            }
            return false;
        } catch (RegularErrorException e) {
            return false;
        }
    }

    public void logout(Http.Context ctx) {

//        if (isAuthenticated(ctx) && getCurrentUser() != null && getCurrentUser().getLoginCredential() != null) {
//            Account currentAccount = getCurrentUser();
//        }
        ctx.response().discardCookie(COOKIE_KEEP_SESSION_OPEN);
        ctx.session().clear();
    }

    public void storeAccount(Http.Context context, Account account) {

        //if the login and the password are ok, refresh the session
        Http.Context.current().session().clear();
        Http.Context.current().session().put(SESSION_IDENTIFIER_STORE, account.getEmail());

        context.changeLang(account.getLang().code());

        //store the id ccookie for mobile application
        context.response().setCookie(COOKIE_KEEP_SESSION_OPEN, generateCookieKey(), 2592000);
    }

    public String generateCookieKey() {
        if (getCurrentUser() != null) {
            return getCurrentUser().getId() + ":" + getCurrentUser().getAuthenticationKey();
        }
        return null;
    }

    public Business getBusiness() {
        Account currentUser = getCurrentUser();
        return currentUser.getBusiness();
    }

}
