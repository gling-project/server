package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import java.util.List;

/**
 * Created by florian on 18/05/15.
 */
public class BusinessCategoryLittleDTO extends DTO {

    private String name;

    private String translationName;

    public BusinessCategoryLittleDTO() {
    }

    public BusinessCategoryLittleDTO(String name, String translationName) {
        this.name = name;
        this.translationName = translationName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTranslationName() {
        return translationName;
    }

    public void setTranslationName(String translationName) {
        this.translationName = translationName;
    }

    @Override
    public String toString() {
        return "BusinessCategoryLittleDTO{" +
                "name='" + name + '\'' +
                ", translationName='" + translationName + '\'' +
                "} " + super.toString();
    }
}
