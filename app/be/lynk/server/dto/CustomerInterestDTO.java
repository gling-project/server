package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.technical.AbstractEntity;
import play.modules.mongodb.jackson.KeyTyped;

import javax.persistence.Basic;
import javax.persistence.Entity;
import java.util.Date;

/**
 * Created by florian on 17/05/15.
 */
public class CustomerInterestDTO extends DTO implements KeyTyped<Date> {

    private Long id;

    private String name;

    private String translationName;

    private Integer orderIndex;

    private String iconName;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomerInterestDTO() {
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public CustomerInterestDTO(String name) {
        this.name = name;
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        CustomerInterestDTO that = (CustomerInterestDTO) o;

        if (!name.equals(that.name)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public String toString() {
        return "CustomerInterest{" +
                "name='" + name + '\'' +
                ", translationName='" + translationName + '\'' +
                '}';
    }
}
