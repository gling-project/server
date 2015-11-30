package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Account;
import be.lynk.server.service.NotificationService;
import be.lynk.server.util.message.NotificationMessageEnum;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by florian on 13/11/15.
 */
@Service
public class NotificationServiceImpl implements NotificationService {


    private static final String PARSE_PUSH_PATH = "https://api.parse.com/1/push";

    @Override
    public void sendNotification(NotificationMessage title, NotificationMessage content, List<Account> accounts) {
/*
        F.Promise.promise(() -> {

            tra

            Map<String, String> headers = new HashMap<>();
            headers.put("X-Parse-Application-Id", "qUEDet4Q24JkiXhWTELqJFHeZ6bbvEcLw6WfXy5p");
            headers.put("X-Parse-REST-API-Key", "rsqv85DLrSbfpsBcWVv5605FPRMniQKDnzWx68Kp");

            ParseNotificationDTO parseNotificationDTO = new ParseNotificationDTO();
            parseNotificationDTO.getData().setAlert(content);
            parseNotificationDTO.getData().setTitle(title);

            for (Account account : accounts) {
                parseNotificationDTO.getChannels().add("user" + account.getId());
            }

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.POST, PARSE_PUSH_PATH);
            httpRequest.setDto(parseNotificationDTO);
            httpRequest.setHeader(headers);
            try {
                httpRequest.sendRequest();
            } catch (HttpRequestException e) {
                e.printStackTrace();
            }
            return null;
        });
        */
    }

    public static final class NotificationMessage{

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
