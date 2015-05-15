package be.flo.project.dto;

import be.flo.project.dto.technical.DTO;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 29/12/14.
 */
public class InterfaceDataDTO extends DTO{

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
