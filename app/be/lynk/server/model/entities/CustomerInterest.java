package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.util.List;

/**
 * Created by florian on 17/05/15.
 */
@Entity
public class CustomerInterest extends AbstractEntity implements Comparable<CustomerInterest>{

    @Basic(optional = false)
    @Column(unique = true)
    private String name;

    @Basic
    private String translationName;

    @Basic
    private Integer orderIndex;

    @OneToMany(mappedBy = "customerInterest",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private List<CategoryInterestLink> links;

    public CustomerInterest() {
    }

    public CustomerInterest(String name, String translationName, Integer orderIndex) {
        this.name = name;
        this.translationName = translationName;
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

    public List<CategoryInterestLink> getLinks() {
        return links;
    }

    public void setLinks(List<CategoryInterestLink> links) {
        this.links = links;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        CustomerInterest that = (CustomerInterest) o;

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

    @Override
    public int compareTo(CustomerInterest o) {
        return this.orderIndex.compareTo(o.orderIndex);
    }
}
