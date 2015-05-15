package be.flo.project.dto;

import be.flo.project.dto.technical.DTO;
import be.flo.project.util.constants.ValidationRegex;

import javax.management.loading.MLetContent;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * Created by florian on 3/05/15.
 */
public class FacebookAuthenticationDTO extends DTO {

    @NotNull(message = "--.validation.dto.notNull")
    private String userId;

    @NotNull(message = "--.validation.dto.notNull")
    private String token;
    private LangDTO lang;

    public FacebookAuthenticationDTO() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "FacebookAuthenticationDTO{" +
                "userId=" + userId +
                ", token='" + token + '\'' +
                '}';
    }

    public LangDTO getLang() {
        return lang;
    }

    public void setLang(LangDTO lang) {
        this.lang = lang;
    }
}
