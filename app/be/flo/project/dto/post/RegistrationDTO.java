package be.flo.project.dto.post;

import be.flo.project.dto.LangDTO;
import be.flo.project.dto.technical.DTO;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


/**
 * Created by florian on 11/11/14.
 */
public class RegistrationDTO extends DTO {

    @NotNull
    private Boolean male;

    @NotNull
    @Pattern(regexp = ".{2,50}",message = "--.validation.dto.size")
    private String firstname;

    @NotNull
    @Pattern(regexp = ".{2,50}",message = "--.validation.dto.size")
    private String lastname;

    @NotNull
    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",message = "--.validation.dto.email")
    private String email;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9-_]{6,18}",message = "--.validation.dto.password")
    private String password;

    private LangDTO lang;

    private Boolean keepSessionOpen;

    public Boolean getMale() {
        return male;
    }

    public void setMale(Boolean male) {
        this.male = male;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LangDTO getLang() {
        return lang;
    }

    public void setLang(LangDTO lang) {
        this.lang = lang;
    }

    public void setKeepSessionOpen(Boolean keepSessionOpen) {
        this.keepSessionOpen = keepSessionOpen;
    }

    public Boolean getKeepSessionOpen() {
        return keepSessionOpen;
    }

    @Override
    public String toString() {
        return "RegistrationDTO{" +
                "male=" + male +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", lang='" + lang + '\'' +
                ", keepSessionOpen=" + keepSessionOpen +
                '}';
    }
}
