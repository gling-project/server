package be.flo.project.model.entities.converter;

import play.Logger;
import play.i18n.Lang;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 * Created by florian on 17/04/15.
 */
@Converter(autoApply = true)
public class I18NLangConverter implements AttributeConverter<Lang,String>{


    @Override
    public String convertToDatabaseColumn(Lang lang) {
        String code = lang.code();
        return code;
    }

    @Override
    public Lang convertToEntityAttribute(String s) {
        Lang lang = Lang.forCode("en");
        return lang;
    }
}
