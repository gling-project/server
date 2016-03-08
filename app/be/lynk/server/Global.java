package be.lynk.server;

import be.lynk.server.controller.EmailController;
import be.lynk.server.controller.technical.security.CommonSecurityController;
import be.lynk.server.controller.technical.security.source.SourceEnum;
import be.lynk.server.dto.technical.ExceptionDTO;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.mongoService.impl.MongoDTO;
import be.lynk.server.service.TranslationService;
import be.lynk.server.util.exception.RegularErrorException;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import play.*;
import play.api.mvc.EssentialFilter;
import play.filters.gzip.GzipFilter;
import play.i18n.Lang;
import play.libs.F;
import play.libs.F.Promise;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Results;
import play.mvc.SimpleResult;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by florian on 10/11/14.
 */
@Component
public class Global extends GlobalSettings {

    private static final String SSL_HEADER = "x-forwarded-proto";

    private ApplicationContext ctx;

    @Override
    public void onStart(Application app) {

        //configure spring
        ctx = new ClassPathXmlApplicationContext("components.xml");
    }

    public <T extends EssentialFilter> Class<T>[] filters() {
        return new Class[]{GzipFilter.class};
    }

    @Override
    public <A> A getControllerInstance(Class<A> clazz) {

        play.Logger.debug("Spring getControllerInstance called @" + new Date(ctx.getStartupDate()) + " for class " + clazz.getName());
//
        // filter clazz annotation to avoid messing win non Spring annotation
        if (clazz.isAnnotationPresent(Component.class)
                || clazz.isAnnotationPresent(Controller.class)
                || clazz.isAnnotationPresent(Service.class)
                || clazz.isAnnotationPresent(Repository.class)) {
            Logger.debug("getControllerInstance <clazz> " + clazz + " getBean : " + ctx.getBean(clazz));
            return ctx.getBean(clazz);
        } else {
            Logger.debug("getControllerInstance <clazz>" + clazz + " returning null to Play instance controller");
            return null;
        }
    }

    @Override
    public F.Promise<SimpleResult> onError(Http.RequestHeader request, Throwable t) {

        //inject translationService
        TranslationService translationService = ctx.getBean(TranslationService.class);

        //load language expected
        Lang language;
        if (request.getHeader(CommonSecurityController.REQUEST_HEADER_LANGUAGE) != null) {
            language = Lang.forCode(request.getHeader(CommonSecurityController.REQUEST_HEADER_LANGUAGE));
        } else {
            language = Lang.availables().get(0);
        }

        final ExceptionDTO exceptionsDTO;

        // manage regular error
        if (t.getCause() instanceof RegularErrorException) {
            RegularErrorException exception = ((RegularErrorException) t.getCause());
            String                message;

            if (exception.getErrorMessage() != null) {
                message = translationService.getTranslation(exception.getErrorMessage(), language, exception.getParams());
            } else {
                message = exception.getMessage();
            }
            exceptionsDTO = new ExceptionDTO(message);
            return F.Promise.<SimpleResult>pure(Results.badRequest(exceptionsDTO));
        }
        //unexpected error => send a error rapport
        else {
            //inject email controller
            EmailController emailController = ctx.getBean(EmailController.class);
            exceptionsDTO = new ExceptionDTO(t.getCause().getMessage());
            emailController.sendUnexpectedErrorReport(t.getCause(), Http.Context.current());
        }
        return F.Promise.<SimpleResult>pure(Results.internalServerError(exceptionsDTO));
    }


    @Override
    public Action onRequest(Http.Request request, Method actionMethod) {

        Action action = null;
        // ENFORCE HTTPS on production
        if (Play.isProd() && !isHttpsRequest(request)) {
            return new Action() {
                @Override
                public Promise<SimpleResult> call(Http.Context ctx) throws Throwable {
                    return Promise.pure(Results.redirect("https://" + ctx.request().host() + ctx.request().uri()));
                }
            };

        }

        return new Action.Simple() {
            public Promise<SimpleResult> call(Http.Context ctx) throws Throwable {
/*
                //save request into mongo
                saveRequestIntoMongo(ctx,request);
                
  */
                return delegate.call(ctx);
            }
        };
    }


    private static boolean isHttpsRequest(Http.Request request) {
        // heroku passes header on
        return request.getHeader(SSL_HEADER) != null
                && request.getHeader(SSL_HEADER)
                .contains("https");
    }
    
    /*
    public void saveRequestIntoMongo(Http.Context ctx, Http.Request request){

        //load data
        String route = (String) ctx.args.get("ROUTE_CONTROLLER");
        String action = (String) ctx.args.get("ROUTE_ACTION_METHOD");
        String url = (String) ctx.args.get("ROUTE_PATTERN");
        Map<String, String> params = new HashMap<>();
        String[] urlEls = url.split("/");
        String path = ctx.request().path();

        String p = "";

        Pattern urlPattern = Pattern.compile(".*<(.*)>.*");

        for (int i = 0; i < urlEls.length; i++) {
            String param = urlEls[i];
            Matcher matcher = urlPattern.matcher(param);
            if(matcher.find()){
                p+="("+matcher.group(1)+")";
            }
            else{
                p+=param;
            }
            if(i!=urlEls.length-1){
                p+="/";
            }
        }

        Pattern pattern = Pattern.compile(p);
        Matcher matcher = pattern.matcher(path);

        if (matcher.find()){
            for (int i = 1; i < matcher.groupCount()+1; i++) {
                String value = matcher.group(i);
                params.put("param" + i, value);
            }
        }

        //session number
        String uuid = ctx.session().get("uuid");
        if (uuid == null) {
            uuid = java.util.UUID.randomUUID().toString();
            ctx.session().put("uuid", uuid);
        }

        //build object
        MongoDTO mongoDTO  = new MongoDTO();
        mongoDTO.setHeaders(request.headers());
        mongoDTO.setParsingDate(new Date());
        mongoDTO.setRequestParams(params);
        mongoDTO.setDevice(getDevice(ctx));
        mongoDTO.setSessionId(uuid);
        if (request.body().asJson()!=null && request.body().asJson().toString().length()>2) {
            mongoDTO.setRequestData(request.body().asJson().toString());
        }

        //inject mongo operator
        MongoDBOperator mongoDBOperator = Global.this.ctx.getBean(MongoDBOperator.class);

        mongoDBOperator.write(route + "." + action,mongoDTO);
    }
    */

    public SourceEnum getDevice(Http.Context ctx) {

        Http.Request request = ctx.request();

        if(request.getHeader("User-Agent").contains("iPhone") ||
                ctx.request().getHeader("User-Agent").contains("iPod")){
            return SourceEnum.IPHONE;
        }
        else if(StringUtils.containsIgnoreCase(request.getHeader("User-Agent"),"android")){
            return SourceEnum.ANDROID;
        }
        else{
            return SourceEnum.WEBSITE;
        }
    }
}
