package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import javax.validation.constraints.Size;

/**
 * Created by florian on 19/10/15.
 */
public class EmailDTO extends DTO{

    @Size(min = 1,max = 255,message = "--.validation.dto.size")
    private String subject;

    @Size(min = 1,max = 10000,message = "--.validation.dto.size")
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
