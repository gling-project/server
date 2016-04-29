package be.lynk.server.service;

import be.lynk.server.model.entities.Account;
import be.lynk.server.service.impl.NotificationServiceImpl;
import be.lynk.server.util.ApplicationNotificationTypeEnum;
import be.lynk.server.util.message.NotificationMessageEnum;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by florian on 13/11/15.
 */
public interface NotificationService {

    void createNotification(ApplicationNotificationTypeEnum type, String targetData,LocalDateTime localDateTime, NotificationServiceImpl.NotificationMessage title, NotificationServiceImpl.NotificationMessage content);

    void sendNotification();
}
