package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;


import java.util.Date;
import java.util.List;

/**
 * Created by florian on 18/05/15.
 */
public class BusinessCategoryDTO extends DTO implements Comparable<BusinessCategoryDTO>{

    private String name;

    private String translationName;

    private Integer orderIndex;

    private List<BusinessCategoryDTO> children;

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
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

    public List<BusinessCategoryDTO> getChildren() {
        return children;
    }

    public void setChildren(List<BusinessCategoryDTO> children) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BusinessCategoryDTO that = (BusinessCategoryDTO) o;

        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }

    @Override
    public int compareTo(BusinessCategoryDTO o) {
        return this.getOrderIndex().compareTo(o.getOrderIndex());
    }
}
