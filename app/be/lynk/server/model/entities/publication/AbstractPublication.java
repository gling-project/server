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
    private String title;

    @Basic
    @Column(columnDefinition = "text")
    private String description;

    @Basic(optional = false)
    private String searchableTitle;

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

    public AbstractPublication() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
        this.setSearchableTitle(normalize(title));
    }

    public Business getBusiness() {
        return business;
    }

    public String getSearchableTitle() {
        return searchableTitle;
    }

    public void setSearchableTitle(String searchableTitle) {
        this.searchableTitle = searchableTitle;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
