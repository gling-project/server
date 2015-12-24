
package be.lynk.server.service.impl;

import akka.actor.Cancellable;
import be.lynk.server.dto.externalDTO.ParseNotificationDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.ApplicationNotification;
import be.lynk.server.model.entities.Business;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.FollowLinkService;
import be.lynk.server.service.NotificationService;
import be.lynk.server.service.TranslationService;
import be.lynk.server.util.ApplicationNotificationTypeEnum;
import be.lynk.server.util.httpRequest.HttpRequest;
import be.lynk.server.util.httpRequest.HttpRequestException;
import be.lynk.server.util.message.NotificationMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import play.Configuration;
import play.Logger;
import play.db.jpa.JPA;
import play.i18n.Lang;
import play.libs.Akka;
import play.libs.F;
import scala.concurrent.duration.Duration;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Created by florian on 13/11/15.
 */
@Service
public class NotificationServiceImpl extends CrudServiceImpl<ApplicationNotification> implements NotificationService {


    private static final String PARSE_PUSH_PATH = "https://api.parse.com/1/push";
    private              String appStatus       = Configuration.root().getString("app.status");

    @Autowired
    private TranslationService translationService;
    @Autowired
    private FollowLinkService  followLinkService;
    @Autowired
    private BusinessService    businessService;
    private Cancellable schedule = null;

    @Override
    public void createNotification(ApplicationNotificationTypeEnum type, String targetData, LocalDateTime localDateTime, NotificationMessage title, NotificationMessage content) {


        if (appStatus.equals("PROD")) {

            //sort account by language
            for (Lang lang : Lang.availables()) {

                ApplicationNotification applicationNotification = new ApplicationNotification();
                applicationNotification.setWasSent(false);
                applicationNotification.setType(type);
                applicationNotification.setTargetData(targetData);
                applicationNotification.setLang(lang);
                applicationNotification.setDate(localDateTime);

                //load translation for key
                String titleS, contentS;
                if (title.notificationMessage != null) {
                    titleS = translationService.getTranslation(title.notificationMessage, lang, title.objects);
                } else {
                    titleS = title.message;
                }
                if (content.notificationMessage != null) {
                    contentS = translationService.getTranslation(content.notificationMessage, lang, content.objects);
                } else {
                    contentS = content.message;
                }
                applicationNotification.setAlert(contentS);
                applicationNotification.setTitle(titleS);

                if (localDateTime.compareTo(LocalDateTime.now()) < 0) {
                    //send immediately
                    sendNotification(applicationNotification);
                } else {
                    //send later
                    super.saveOrUpdate(applicationNotification);
                }
            }

            if (schedule == null) {
                //active akka
                schedule = Akka.system().scheduler().schedule(
                        Duration.create(0, TimeUnit.MILLISECONDS),
                        Duration.create(1, TimeUnit.HOURS),
                        () -> {
                            Logger.info("je suis un CRON : " + LocalDateTime.now().toString());
                            sendNotification();
                        },
                        Akka.system().dispatchers().defaultGlobalDispatcher()
                );
            }
        }


    }

    @Override
    public void sendNotification() {

        JPA.withTransaction(() -> {

            LocalDateTime now = LocalDateTime.now();

            String request = "SELECT ap from ApplicationNotification ap,  where ap.date > :date1 and ap.date < :date2 and ap.wasSent = :wasSent";


            List<ApplicationNotification> ns = JPA.em().createQuery(request, ApplicationNotification.class)
                    .setParameter("date1", now.minusMinutes(60))
                    .setParameter("date2", now)
                    .setParameter("wasSent", false)
                    .getResultList();


            if (ns.size() > 0) {
                for (ApplicationNotification n : ns) {
                    sendNotification(n);
                    n.setWasSent(true);
                    saveOrUpdate(n);
                }

            }
        });
    }

    private void sendNotification(ApplicationNotification n) {
        final Map<String, String> headers = new HashMap<>();
        headers.put("X-Parse-Application-Id", "qUEDet4Q24JkiXhWTELqJFHeZ6bbvEcLw6WfXy5p");
        headers.put("X-Parse-REST-API-Key", "rsqv85DLrSbfpsBcWVv5605FPRMniQKDnzWx68Kp");


        //build notificaiton
        ParseNotificationDTO parseNotificationDTO = new ParseNotificationDTO();

        switch (n.getType()) {
            case NEW_PUBLICATION:
                //load related business
                Business business = businessService.findById(Long.parseLong(n.getTargetData()));
                //load target
                List<Account> accounts = followLinkService.findAccountByBusiness(business);
                for (Account account : accounts.stream().filter((a) -> a.getLang().equals(n.getLang())).collect(Collectors.toList())) {
                    parseNotificationDTO.getChannels().add("user" + account.getId());
                }
                break;
        }

        if (parseNotificationDTO.getChannels().size() > 0) {


            parseNotificationDTO.getData().setAlert(n.getAlert());
            parseNotificationDTO.getData().setTitle(n.getTitle());
        }

        HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.POST, PARSE_PUSH_PATH);
        httpRequest.setDto(parseNotificationDTO);
        httpRequest.setHeader(headers);
        try {
            httpRequest.sendRequest();
        } catch (HttpRequestException e) {
            e.printStackTrace();
        }
    }


    public static final class NotificationMessage {

        private String message;

        private NotificationMessageEnum notificationMessage;

        private Object[] objects;

        public NotificationMessage(String message) {
            this.message = message;
        }

        public NotificationMessage(NotificationMessageEnum notificationMessage, Object... objects) {
            this.notificationMessage = notificationMessage;
            this.objects = objects;
        }
    }

}
