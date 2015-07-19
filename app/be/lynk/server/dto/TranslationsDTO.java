package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import play.modules.mongodb.jackson.KeyTyped;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by florian on 28/12/14.
 */
public class TranslationsDTO extends DTO implements KeyTyped<Date> {

    private Map<String,String> translations;

    public TranslationsDTO() {
        translations = new HashMap<>();
    }

    public TranslationsDTO(Map<String, String> translations) {
        this.translations = translations;
    }

    public Map<String, String> getTranslations() {
        return translations;
    }

    public void setTranslations(HashMap<String, String> translations) {
        this.translations = translations;
    }

    @Override
    public String toString() {
        return "TranslationsDTO{" +
                "translations=" + translations +
                '}';
    }
}
