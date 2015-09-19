import be.lynk.server.controller.technical.security.CommonSecurityController;
import be.lynk.server.dto.technical.ExceptionDTO;
import be.lynk.server.service.impl.TranslationServiceImpl;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import play.*;
import play.api.mvc.EssentialFilter;
import play.i18n.Lang;
import play.libs.F.Promise;
import play.libs.Akka;
import play.libs.F;
import play.mvc.Http;
import play.mvc.Results;
import play.mvc.SimpleResult;
import scala.concurrent.duration.Duration;
import be.lynk.server.service.TranslationService;
import be.lynk.server.util.exception.MyRuntimeException;
import play.filters.gzip.GzipFilter;
import play.mvc.Action;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * Created by florian on 10/11/14.
 */
public class Global extends GlobalSettings {

    //services
    private TranslationService translationService = new TranslationServiceImpl();



    private static final String SSL_HEADER = "x-forwarded-proto";

    private ApplicationContext ctx;

    @Override
    public void onStart(Application app) {

//        ctx = new AnnotationConfigApplicationContext(AppConfig.class, DataConfig.class);

        //final String configLocation = Play.application().configuration().getString("spring.context.location");
        ctx = new ClassPathXmlApplicationContext("components.xml");//new AnnotationConfigApplicationContext(AppConfig.class, DataConfig.class);//
        play.Logger.info("Spring Startup @" + new Date(ctx.getStartupDate()));


//        // run keepalive only in prod environment to avoid calls during test and dev targets
//        if (app.isProd()) {
//            final String hostname = System.getenv().get("Hostname");
//            if (hostname != null) {
//
//                Akka.system().scheduler().schedule(
//                        Duration.create(10, TimeUnit.SECONDS),
//                        Duration.create(10, TimeUnit.MINUTES),
//                        new Runnable() {
//                            public void run() {
//                                try {
//                                    play.Logger.info("Getting " + hostname + " for keep-alive ...");
//                                    HttpClient httpClient = new DefaultHttpClient();
//                                    HttpGet httpGet = new HttpGet(hostname);
//                                    HttpResponse response = httpClient.execute(httpGet);
//                                    play.Logger.info("Got " + hostname + " for keep-alive.");
//                                } catch (Exception e) {
//                                    play.Logger.info("Getting " + hostname + " for keep-alive ended with an exception", e);
//                                }
//                            }
//                        },
//                        Akka.system().dispatchers().defaultGlobalDispatcher()
//                );
//            } else {
//                play.Logger.info("Akka keep-alive won't run because the environment variable 'AwacHostname' does not exist.");
//            }
//        } // end of app.isProd()
    }

    public <T extends EssentialFilter> Class<T>[] filters() {
        return new Class[]{GzipFilter.class};
    }

    @Override
    public <A> A getControllerInstance(Class<A> clazz) {
//        return ctx.getBean(clazz);

        play.Logger.debug("Spring getControllerInstance called @" + new Date(ctx.getStartupDate()) + " for class " + clazz.getName());
//        //return applicationContext.getBean(clazz);
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

        //load language expected
        Lang language;
        if (request.getHeader(CommonSecurityController.REQUEST_HEADER_LANGUAGE) != null) {
            language = Lang.forCode(request.getHeader(CommonSecurityController.REQUEST_HEADER_LANGUAGE));
        } else {
            language = Lang.availables().get(0);
        }

        final ExceptionDTO exceptionsDTO;

        if (t.getCause() instanceof MyRuntimeException) {
            MyRuntimeException exception = ((MyRuntimeException) t.getCause());
            String message;

            if (exception.getErrorMessage() != null) {
                message = translationService.getTranslation(exception.getErrorMessage(), language, exception.getParams());
            } else {
                message = exception.getMessage();
            }
            exceptionsDTO = new ExceptionDTO(message);
        } else {
            exceptionsDTO = new ExceptionDTO(t.getCause().getMessage());
        }
        return F.Promise.<SimpleResult>pure(Results.internalServerError(exceptionsDTO));
    }


    @Override
    public Action onRequest(Http.Request request, Method actionMethod) {

        Configuration root = Configuration.root();

        String appStatus = root.getString("app.status");

        // Analytics analytics = AnalyticsUtil.start(request);
        Action action = null;
        if (appStatus!=null && appStatus.equals("COMING_SOON")) {
            action = new Action() {
                @Override
                public Promise<SimpleResult> call(Http.Context ctx) throws Throwable {
                    Logger.info("host:" + ctx.request().host());
                    Logger.info("host:" + ctx.request().toString());
                    Logger.info("host:" + ctx.request().uri());
                    return Promise.<SimpleResult>pure(Results.ok(be.lynk.server.views.html.comingSoon.render()));
                }
            };
        } else {
            // ENFORCE HTTPS on production
            if (Play.isProd() && !isHttpsRequest(request)) {
                action = new Action() {
                    @Override
                    public Promise<SimpleResult> call(Http.Context ctx) throws Throwable {
                        return Promise.<SimpleResult>pure(Results.redirect("https://" + ctx.request().host() + ctx.request().uri()));
                    }
                };
            }
        }

        //AnalyticsUtil.end(analytics);
        if (action == null) {
            return super.onRequest(request, actionMethod);
        }
        return action;
    }


    private static boolean isHttpsRequest(Http.Request request) {
        // heroku passes header on
        return request.getHeader(SSL_HEADER) != null
                && request.getHeader(SSL_HEADER)
                          .contains("https");
    }
}
