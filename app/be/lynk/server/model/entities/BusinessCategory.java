package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by florian on 18/05/15.
 */
@Entity
public class BusinessCategory extends AbstractEntity{

    @Basic(optional = false)
    private String name;

    @Basic(optional = false)
    private String translationName;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "parent",orphanRemoval = true)
    private Set<BusinessCategory> children;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private BusinessCategory parent;

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

    public Set<BusinessCategory> getChildren() {
        return children;
    }

    public void setChildren(Set<BusinessCategory> children) {
        this.children = children;
    }

    public BusinessCategory getParent() {
        return parent;
    }

    public void setParent(BusinessCategory parent) {
        this.parent = parent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

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
}
