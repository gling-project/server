package be.lynk.server.service;

import be.lynk.server.model.entities.Account;

/**
 * Created by florian on 6/12/14.
 */
public interface EmailService {

    void sendEmail(Account account, String title, String body);

    void sendEmail(String email, String title, String body);
}
