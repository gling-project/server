package be.lynk.server.service;

import be.lynk.server.model.entities.Account;
import be.lynk.server.service.impl.NotificationServiceImpl;
import be.lynk.server.util.message.NotificationMessageEnum;

import java.util.List;

/**
 * Created by florian on 13/11/15.
 */
public interface NotificationService {

    void sendNotification(NotificationServiceImpl.NotificationMessage title, NotificationServiceImpl.NotificationMessage content, List<Account> accounts) ;
}
