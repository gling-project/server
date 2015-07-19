package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import play.modules.mongodb.jackson.KeyTyped;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by florian on 29/12/14.
 */
public class InterfaceDataDTO extends DTO implements KeyTyped<Date> {

    private AccountDTO mySelf;

    private TranslationsDTO translations;

    private String langId;

    private List<LangDTO> languages;
    private String appId;

    public List<LangDTO> getLanguages() {
        return languages;
    }

    public void setLanguages(List<LangDTO> languages) {
        this.languages = languages;
    }

    public String getLangId() {
        return langId;
    }

    public void setLangId(String langId) {
        this.langId = langId;
    }

    public AccountDTO getMySelf() {
        return mySelf;
    }

    public void setMySelf(AccountDTO mySelf) {
        this.mySelf = mySelf;
    }

    public TranslationsDTO getTranslations() {
        return translations;
    }

    public void setTranslations(TranslationsDTO translations) {
        this.translations = translations;
    }


    public void addLanguage(LangDTO language) {
        if(languages == null){
            languages = new ArrayList<>();
        }
        languages.add(language);
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppId() {
        return appId;
    }
}
