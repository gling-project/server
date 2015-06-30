package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 18/05/15.
 */
public class BusinessCategoryLittleContainerDTO extends DTO {

    private Map<String, Map<String, List<BusinessCategoryLittleDTO>>> categories = new HashMap<>();

    public Map<String, Map<String, List<BusinessCategoryLittleDTO>>> getCategories() {
        return categories;
    }

    public void setCategories(Map<String, Map<String, List<BusinessCategoryLittleDTO>>> categories) {
        this.categories = categories;
    }
}
