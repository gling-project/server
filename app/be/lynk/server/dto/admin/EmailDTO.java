package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

/**
 * Created by florian on 19/10/15.
 */
public class EmailDTO extends DTO{

    private String subject;

    private String message;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
