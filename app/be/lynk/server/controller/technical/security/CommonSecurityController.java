package be.lynk.server.controller.technical.security;

import be.lynk.server.controller.technical.security.source.SourceEnum;
import be.lynk.server.dto.technical.ExceptionDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.service.AccountService;
import be.lynk.server.service.impl.AccountServiceImpl;
import be.lynk.server.util.exception.MyRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import play.api.i18n.Lang;
import play.i18n.Messages;
import play.mvc.Http;
import play.mvc.Results;
import play.mvc.Security;
import be.lynk.server.util.message.ErrorMessageEnum;
import play.mvc.SimpleResult;

/**
 * Created by florian on 10/11/14.
 */
@org.springframework.stereotype.Controller
public class CommonSecurityController extends Security.Authenticator {

    //recover the language into the http request
    public static final String REQUEST_HEADER_LANGUAGE = "language";
    //recover the email into the session
    public static final String SESSION_IDENTIFIER_STORE = "email";
    //name of the cookie for the automatic reconnection
    public static final String COOKIE_KEEP_SESSION_OPEN = "session_key";
    //recover the session key into the http request
    public static final String REQUEST_HEADER_AUTHENTICATION_KEY = "authenticationKey";
    //recover the session key into the http request
    public static final String REQUEST_HEADER_SOURCE = "applicationSource";
    //error for failed authentication
    public static final String FAILED_AUTHENTICATION_CAUSE = "FAILED_AUTHENTICATION_CAUSE";
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

    public SourceEnum getSource(Http.Context ctx){
        return SourceEnum.ANDROID;//SourceEnum.getByKey(ctx.request().getHeader(REQUEST_HEADER_SOURCE));
    }

    @Override
    public SimpleResult onUnauthorized(Http.Context ctx) {
        if(getSource(ctx)==SourceEnum.WEBSITE){
            //TODO return ok(be.flo.project.views.html.home.render(getAvaiableLanguage(),interfaceDataDTO));
        }
        if(ctx.args.get(FAILED_AUTHENTICATION_CAUSE) == FAILED_AUTHENTICATION_CAUSE_WRONG_RIGHTS){
            return Results.unauthorized(new ExceptionDTO(Messages.get(Lang.defaultLang(), ErrorMessageEnum.WRONG_AUTHORIZATION.name())));
        }
        return unauthorized(new ExceptionDTO(Messages.get(Lang.defaultLang(), ErrorMessageEnum.NOT_CONNECTED.name())));
    }

    /**
     * return the current user if the user is authenticated
     * @return
     */
    public Account getCurrentUser() {

        //by session
        if (Http.Context.current().session().get(SESSION_IDENTIFIER_STORE) != null) {
            return USER_SERVICE.findByEmail(Http.Context.current().session().get(SESSION_IDENTIFIER_STORE));
        }

        //by request
        if(Http.Context.current().request().getHeader(REQUEST_HEADER_AUTHENTICATION_KEY)!=null) {
            String authentication = Http.Context.current().request().getHeader(REQUEST_HEADER_AUTHENTICATION_KEY);
            return  USER_SERVICE.findByAuthenticationKey(authentication);
        }
        throw new MyRuntimeException(ErrorMessageEnum.NOT_CONNECTED);
    }

    /**
     * return true if the user is authenticated
     * @param ctx
     * @return
     */
    public boolean isAuthenticated(Http.Context ctx) {

        if (ctx.session().get(SESSION_IDENTIFIER_STORE) != null) {
            return true;
        }

        if (ctx.request().cookie(CommonSecurityController.COOKIE_KEEP_SESSION_OPEN) != null) {

            String key = ctx.request().cookie(CommonSecurityController.COOKIE_KEEP_SESSION_OPEN).value();

            String keyElements[] = key.split(":");

            try {
                Account account = USER_SERVICE.findById(Long.parseLong(keyElements[0]));

                if (account != null && USER_SERVICE.controlAuthenticationKey(keyElements[1], account)) {
                    //connection
                    storeAccount(ctx, account);
                    return true;
                }
            }
            catch(NumberFormatException e){

            }
        }

        return false;
    }

    public void logout(Http.Context ctx) {

        if (isAuthenticated(ctx) && getCurrentUser().getLoginCredential()!=null && getCurrentUser().getLoginCredential().isKeepSessionOpen()) {

            Account currentAccount = getCurrentUser();
            currentAccount.getLoginCredential().setKeepSessionOpen(false);

            USER_SERVICE.saveOrUpdate(currentAccount);
            ctx.response().discardCookie(COOKIE_KEEP_SESSION_OPEN);
        }
        ctx.session().clear();
    }

    public void storeAccount(Http.Context context, Account account) {

        //if the login and the password are ok, refresh the session
        Http.Context.current().session().clear();
        Http.Context.current().session().put(SESSION_IDENTIFIER_STORE, account.getEmail());

        context.changeLang(account.getLang().code());

        if (account.getLoginCredential()!=null &&
                account.getLoginCredential().isKeepSessionOpen()) {
            context.response().setCookie(COOKIE_KEEP_SESSION_OPEN, getCookieKey(),2592000);
        } else {
            context.response().discardCookie(COOKIE_KEEP_SESSION_OPEN);
        }
    }

    public String getCookieKey() {
        if(getCurrentUser()!=null){
            return getCurrentUser().getId()+":"+getCurrentUser().getAuthenticationKey();
        }
        return null;
    }
}
