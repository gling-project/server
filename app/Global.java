import be.flo.project.controller.technical.security.CommonSecurityController;
import be.flo.project.dto.technical.ExceptionDTO;
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
import play.Application;
import play.GlobalSettings;
import play.Logger;
import play.Play;
import play.i18n.Lang;
import play.libs.Akka;
import play.libs.F;
import play.mvc.Http;
import play.mvc.Results;
import play.mvc.SimpleResult;
import scala.concurrent.duration.Duration;
import be.flo.project.service.TranslationService;
import be.flo.project.service.impl.TranslationServiceImpl;
import be.flo.project.util.exception.MyRuntimeException;

import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * Created by florian on 10/11/14.
 */
public class Global extends GlobalSettings {

    //services
    @Autowired
    private TranslationService translationService;

    private ApplicationContext ctx;

    @Override
    public void onStart(Application app) {
        final String configLocation = Play.application().configuration().getString("spring.context.location");
        ctx = new ClassPathXmlApplicationContext(configLocation);
        play.Logger.info("Spring Startup @" + new Date(ctx.getStartupDate()));


        // run keepalive only in prod environment to avoid calls during test and dev targets
        if (app.isProd()) {
            final String hostname = System.getenv().get("Hostname");
            if (hostname != null) {

                Akka.system().scheduler().schedule(
                        Duration.create(10, TimeUnit.SECONDS),
                        Duration.create(10, TimeUnit.MINUTES),
                        new Runnable() {
                            public void run() {
                                try {
                                    play.Logger.info("Getting " + hostname + " for keep-alive ...");
                                    HttpClient httpClient = new DefaultHttpClient();
                                    HttpGet httpGet = new HttpGet(hostname);
                                    HttpResponse response = httpClient.execute(httpGet);
                                    play.Logger.info("Got " + hostname + " for keep-alive.");
                                } catch (Exception e) {
                                    play.Logger.info("Getting " + hostname + " for keep-alive ended with an exception", e);
                                }
                            }
                        },
                        Akka.system().dispatchers().defaultGlobalDispatcher()
                );
            } else {
                play.Logger.info("Akka keep-alive won't run because the environment variable 'AwacHostname' does not exist.");
            }
        } // end of app.isProd()
    }

    @Override
    public <A> A getControllerInstance(Class<A> clazz) {

        play.Logger.debug("Spring getControllerInstance called @" + new Date(ctx.getStartupDate()));
        //return applicationContext.getBean(clazz);

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
        }
        else {
            language = Lang.availables().get(0);
        }

        final ExceptionDTO exceptionsDTO;

        if (t.getCause() instanceof MyRuntimeException) {
            MyRuntimeException exception = ((MyRuntimeException) t.getCause());
            String message;

            if (exception.getMessage() != null) {
                message = exception.getMessage();
            } else {
                message = translationService.getTranslation(exception.getErrorMessage(), language, exception.getParams());
            }
            exceptionsDTO = new ExceptionDTO(message);
        } else {
            exceptionsDTO = new ExceptionDTO(t.getCause().getMessage());
        }
        return F.Promise.<SimpleResult>pure(Results.internalServerError(exceptionsDTO));
    }
}
