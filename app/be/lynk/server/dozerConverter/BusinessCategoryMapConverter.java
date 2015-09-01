package be.lynk.server.dozerConverter;

import be.lynk.server.dto.BusinessCategoryLittleDTO;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.Translation;
import be.lynk.server.model.entities.TranslationValue;
import org.dozer.CustomConverter;
import play.i18n.Lang;
import play.mvc.Http;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 21/06/15.
 */
public class BusinessCategoryMapConverter implements CustomConverter {

    @Override
    public Object convert(Object destination, Object source,
                          Class destClass, Class sourceClass) {

        if (source instanceof List) {

            Map<String, Map<String, List<BusinessCategoryLittleDTO>>> map = new HashMap<>();

            Lang lang = Http.Context.current().lang();

            for (BusinessCategory businessCategory : ((List<BusinessCategory>) source)) {

                BusinessCategoryLittleDTO third = new BusinessCategoryLittleDTO(
                        businessCategory.getName(),
                        getTranslation(businessCategory.getTranslationName()));
                String second = getTranslation(businessCategory.getParent().getTranslationName());
                String first = getTranslation(businessCategory.getParent().getParent().getTranslationName());

                if (!map.containsKey(first)) {
                    map.put(first, new HashMap<>());
                }
                if (!map.get(first).containsKey(second)) {
                    map.get(first).put(second, new ArrayList<>());
                }
                map.get(first).get(second).add(third);
            }

            return map;

        } else {
            //TODO ?
            return null;
        }
    }

    private String getTranslation(Translation translation){
        String defaultText = null;
        String text = null;
        Lang lang = Http.Context.current().lang();
        for (TranslationValue translationValue : translation.getTranslationValues()) {
            if (translationValue.getLang().equals(lang)) {
                text = translationValue.getContent();
            }
            if (translationValue.getLang().equals("en")) {
                defaultText = translationValue.getContent();
            }
        }
        if (text == null) {
            return defaultText;
        }
        return text;
    }
}
