package be.lynk.server.service;

import be.lynk.server.dto.TranslationsDTO;
import be.lynk.server.model.entities.Translation;
import play.i18n.Lang;
import be.lynk.server.util.message.EmailMessageEnum;
import be.lynk.server.util.message.ErrorMessageEnum;

/**
 * Created by florian on 6/12/14.
 */
public interface TranslationService {

    TranslationsDTO getTranslations(Lang lang);

    String getTranslation(ErrorMessageEnum errorMessage, Lang language, Object... params);

    String getTranslation(String messageRef, Lang language, Object... params);

    String getTranslation(EmailMessageEnum emailMessage, Lang language, Object... params);

    String getTranslation(Translation translation, Lang language, Object... params);
}
