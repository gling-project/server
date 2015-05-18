package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by florian on 18/05/15.
 */
public class BusinessCategoryDTO extends DTO{

    private String name;

    private String translationName;

    private Set<BusinessCategoryDTO> children;

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

    public Set<BusinessCategoryDTO> getChildren() {
        return children;
    }

    public void setChildren(Set<BusinessCategoryDTO> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "BusinessCategory{" +
                "name='" + name + '\'' +
                ", translationName='" + translationName + '\'' +
                ", children=" + children +
                '}';
    }
}
