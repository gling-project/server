package be.flo.project.dto.externalDTO;

import be.flo.project.dto.technical.DTO;

import java.util.Date;
import java.util.List;

/**
 * Created by florian on 3/05/15.
 */
public class FacebookTokenAccessControlDTO extends DTO {

    private String id;
    private String email;
    private String first_name;
    private String gender;
    private String last_name;
    private String link;
    private String locale;
    private String name;
    private int timezone;
    private Date updated_time;
    private boolean verified;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTimezone() {
        return timezone;
    }

    public void setTimezone(int timezone) {
        this.timezone = timezone;
    }

    public Date getUpdated_time() {
        return updated_time;
    }

    public void setUpdated_time(Date updated_time) {
        this.updated_time = updated_time;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    @Override
    public String toString() {
        return "FacebookTokenAccessControlDTO{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", first_name='" + first_name + '\'' +
                ", gender='" + gender + '\'' +
                ", last_name='" + last_name + '\'' +
                ", link='" + link + '\'' +
                ", locale='" + locale + '\'' +
                ", name='" + name + '\'' +
                ", timezone=" + timezone +
                ", updated_time=" + updated_time +
                ", verified=" + verified +
                '}';
    }
}
