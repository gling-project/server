package be.lynk.server.dto.town;

import be.lynk.server.dto.TranslationsDTO;
import be.lynk.server.dto.technical.DTO;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by florian on 9/11/15.
 */
public class TownInitializationDTO extends DTO {

    private TranslationsDTO translations;

    private Map<String, Object> constants = new HashMap<>();

    public TranslationsDTO getTranslations() {
        return translations;
    }

    public void setTranslations(TranslationsDTO translations) {
        this.translations = translations;
    }

    public Map<String, Object> getConstants() {
        return constants;
    }

    public void setConstants(Map<String, Object> constants) {
        this.constants = constants;
    }

    @Override
    public String toString() {
        return "TownInitializationDTO{" +
                "translations=" + translations +
                ", constants=" + constants +
                "} " + super.toString();
    }
}
