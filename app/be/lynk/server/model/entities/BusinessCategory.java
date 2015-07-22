package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 18/05/15.
 */
@Entity
public class BusinessCategory extends AbstractEntity implements Comparable<BusinessCategory>{

    @Basic(optional = false)
    @Column(unique = true)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL,optional = false)
    private Translation translationName;

    @Basic
    private Integer orderIndex;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "parent",orphanRemoval = true)
    private List<BusinessCategory> children = new ArrayList<>();

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private BusinessCategory parent;

    @ManyToMany
    @JoinTable(
            name = "business_category",
            joinColumns = {@JoinColumn(name = "category")},
            inverseJoinColumns = {@JoinColumn(name = "business")})
    private Set<Business> businesses;

    @OneToMany(mappedBy = "businessCategory",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private List<CategoryInterestLink> links;

    public BusinessCategory() {
    }

    public BusinessCategory(String name, Translation translationName, Integer orderIndex) {
        this.setName(name);
        this.translationName = translationName;
        this.orderIndex = orderIndex;
    }

    public BusinessCategory(BusinessCategory parent, String name, Translation translationName, Integer orderIndex) {
        this.parent = parent;
        this.setName(name);
        this.translationName = translationName;
        this.orderIndex = orderIndex;
    }

    public List<CategoryInterestLink> getLinks() {
        return links;
    }

    public void setLinks(List<CategoryInterestLink> links) {
        this.links = links;
    }

    public Set<Business> getBusinesses() {
        return businesses;
    }

    public void setBusinesses(Set<Business> businesses) {
        this.businesses = businesses;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Translation getTranslationName() {
        return translationName;
    }

    public void setTranslationName(Translation translationName) {
        this.translationName = translationName;
    }

    public List<BusinessCategory> getChildren() {
        return children;
    }

    public void setChildren(List<BusinessCategory> children) {
        this.children = children;
    }

    public BusinessCategory getParent() {
        return parent;
    }

    public void setParent(BusinessCategory parent) {
        this.parent = parent;
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

        BusinessCategory that = (BusinessCategory) o;

        if (!name.equals(that.name)) return false;
        if (parent != null ? !parent.equals(that.parent) : that.parent != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + (parent != null ? parent.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "BusinessCategory{" +
                "name='" + name + '\'' +
                ", translationName='" + translationName + '\'' +
                ", parent=" + parent +
                '}';
    }

    @Override
    public int compareTo(BusinessCategory o) {
        return this.orderIndex.compareTo(o.orderIndex);
    }
}
