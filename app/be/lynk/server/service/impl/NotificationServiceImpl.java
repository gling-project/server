package be.lynk.server.service.impl;

import be.lynk.server.dto.externalDTO.ParseNotificationDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.service.NotificationService;
import be.lynk.server.util.httpRequest.HttpRequest;
import be.lynk.server.util.httpRequest.HttpRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 13/11/15.
 */
@Service
public class NotificationServiceImpl implements NotificationService {

    private static final String PARSE_PUSH_PATH = "https://api.parse.com/1/push";

    @Override
    public void sendNotification(String title, String content, List<Account> accounts) {


        Map<String,String> headers = new HashMap<>();
        headers.put("X-Parse-Application-Id","qUEDet4Q24JkiXhWTELqJFHeZ6bbvEcLw6WfXy5p");
        headers.put("X-Parse-REST-API-Key","rsqv85DLrSbfpsBcWVv5605FPRMniQKDnzWx68Kp");

        ParseNotificationDTO parseNotificationDTO = new ParseNotificationDTO();
        parseNotificationDTO.getData().setAlert(content);
        parseNotificationDTO.getData().setTitle(title);

        for (Account account : accounts) {
            parseNotificationDTO.getChannels().add("user"+account.getId());
        }

        HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.POST,PARSE_PUSH_PATH);
        httpRequest.setDto(parseNotificationDTO);
        httpRequest.setHeader(headers);
        try {
            httpRequest.sendRequest();
        } catch (HttpRequestException e) {
            e.printStackTrace();
        }
    }
}
