package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 18/05/15.
 */
public class BusinessCategoryFlatDTO extends DTO {

    private BusinessCategoryLittleDTO category;
    private BusinessCategoryLittleDTO subCategory;
    private BusinessCategoryLittleDTO subSubCategory;

    public BusinessCategoryLittleDTO getCategory() {
        return category;
    }

    public void setCategory(BusinessCategoryLittleDTO category) {
        this.category = category;
    }

    public BusinessCategoryLittleDTO getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(BusinessCategoryLittleDTO subCategory) {
        this.subCategory = subCategory;
    }

    public BusinessCategoryLittleDTO getSubSubCategory() {
        return subSubCategory;
    }

    public void setSubSubCategory(BusinessCategoryLittleDTO subSubCategory) {
        this.subSubCategory = subSubCategory;
    }

    @Override
    public String toString() {
        return "BusinessCategoryFlatDTO{" +
                "category=" + category +
                ", subCategory=" + subCategory +
                ", subSubCategory=" + subSubCategory +
                "} " + super.toString();
    }
}
