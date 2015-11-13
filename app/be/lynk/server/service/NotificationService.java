package be.lynk.server.service;

import be.lynk.server.model.entities.Account;

import java.util.List;

/**
 * Created by florian on 13/11/15.
 */
public interface NotificationService {

    public void sendNotification(String title,String content, List<Account> accounts);
}
