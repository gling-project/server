package be.lynk.server.model.entities.publication;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 5/06/15.
 */
@Entity
public abstract class AbstractPublication  extends AbstractEntity implements Comparable<AbstractPublication >{

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, optional = false)
    private Business business;

    @Basic(optional = false)
    private String description;

    @Basic(optional = false)
    private String searchableDescription;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime startDate;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime endDate;

    @OneToMany(mappedBy = "publication",cascade = CascadeType.ALL)
    private List<StoredFile> pictures=new ArrayList<>();

    public Business getBusiness() {
        return business;
    }

    public String getSearchableDescription() {
        return searchableDescription;
    }

    public void setSearchableDescription(String searchableDescription) {
        this.searchableDescription = searchableDescription;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        this.setSearchableDescription(normalize(description));
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public List<StoredFile> getPictures() {
        return pictures;
    }

    public void setPictures(List<StoredFile> pictures) {
        this.pictures = pictures;
    }

    @Override
    public String toString() {
        return "AbstractPublication{" +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }

    @Override
    public int compareTo(AbstractPublication o) {
        return 0;
    }
}
