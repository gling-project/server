package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.Basic;
import javax.persistence.Entity;

/**
 * Created by florian on 17/05/15.
 */
public class CustomerInterestDTO extends DTO{

    private String name;

    private String translationName;

    public CustomerInterestDTO() {
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
