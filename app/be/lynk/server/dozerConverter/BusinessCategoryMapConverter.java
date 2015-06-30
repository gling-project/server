package be.lynk.server.dozerConverter;

import be.lynk.server.dto.BusinessCategoryDTO;
import be.lynk.server.dto.BusinessCategoryLittleDTO;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.service.DozerService;
import be.lynk.server.service.impl.DozerServiceImpl;
import org.dozer.CustomConverter;

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

            for (BusinessCategory businessCategory : ((List<BusinessCategory>) source)) {

                BusinessCategoryLittleDTO third = new BusinessCategoryLittleDTO(
                        businessCategory.getName(),
                        businessCategory.getTranslationName());
                String second = businessCategory.getParent().getTranslationName();
                String first = businessCategory.getParent().getParent().getTranslationName();

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
}
