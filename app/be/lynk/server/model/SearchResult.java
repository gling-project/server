package be.lynk.server.model;

import be.lynk.server.model.entities.CustomerInterest;

import java.time.LocalDateTime;

/**
 * Created by florian on 1/09/15.
 */
public class SearchResult{

    private Long publicationId;

    private Double posx;

    private Double posy;

    protected LocalDateTime startDate;

    protected LocalDateTime endDate;

    private CustomerInterest interest;

    private Double distance;

    public SearchResult(Long publicationId, Double posx, Double posy, LocalDateTime startDate, LocalDateTime endDate, CustomerInterest interest) {
        this.publicationId = publicationId;
        this.posx = posx;
        this.posy = posy;
        this.startDate = startDate;
        this.endDate = endDate;
        this.interest = interest;
    }

    public Long getPublicationId() {
        return publicationId;
    }

    public void setPublicationId(Long publicationId) {
        this.publicationId = publicationId;
    }

    public Double getPosx() {
        return posx;
    }

    public void setPosx(Double posx) {
        this.posx = posx;
    }

    public Double getPosy() {
        return posy;
    }

    public void setPosy(Double posy) {
        this.posy = posy;
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

    public CustomerInterest getInterest() {
        return interest;
    }

    public void setInterest(CustomerInterest interest) {
        this.interest = interest;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

}
