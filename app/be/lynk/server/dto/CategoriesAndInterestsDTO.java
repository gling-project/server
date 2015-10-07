package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.PublicationTypeEnum;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by florian on 5/06/15.
 */
public class CategoriesAndInterestsDTO extends DTO  {

    private List<CustomerInterestDTO> interests;

    private List<BusinessCategoryWithInterestDTO> categories;

    public CategoriesAndInterestsDTO() {
    }

    public List<CustomerInterestDTO> getInterests() {
        return interests;
    }

    public void setInterests(List<CustomerInterestDTO> interests) {
        this.interests = interests;
    }

    public List<BusinessCategoryWithInterestDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<BusinessCategoryWithInterestDTO> categories) {
        this.categories = categories;
    }
}
