package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import java.util.List;

/**
 * Created by florian on 21/07/15.
 */
public class SearchResultDTO extends DTO {

    private List<BusinessDTO> businesses;
    private List<AbstractPublicationDTO> publications;
    private List<BusinessCategoryLittleDTO> categories;

    public List<BusinessDTO> getBusinesses() {
        return businesses;
    }

    public void setBusinesses(List<BusinessDTO> businesses) {
        this.businesses = businesses;
    }

    public List<AbstractPublicationDTO> getPublications() {
        return publications;
    }

    public void setPublications(List<AbstractPublicationDTO> publications) {
        this.publications = publications;
    }

    public List<BusinessCategoryLittleDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<BusinessCategoryLittleDTO> categories) {
        this.categories = categories;
    }
}
