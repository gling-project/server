package be.lynk.server.dto.map;

import be.lynk.server.dto.BusinessCategoryLittleDTO;
import be.lynk.server.dto.CustomerInterestDTO;
import be.lynk.server.dto.technical.DTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 20/11/15.
 */
public class MapDataBusinessDTO extends DTO {

    private Long id;

    private String name;

    private String illustrationName;

    private String street;

    private String zip;

    private Double posx;

    private Double posy;

    private Boolean following;

    private Boolean isOpen;

    private List<CustomerInterestDTO> interests;

    private Map<String, Map<String, List<BusinessCategoryLittleDTO>>> categories = new HashMap<>();

    public MapDataBusinessDTO() {
    }

    public String getIllustrationName() {
        return illustrationName;
    }

    public void setIllustrationName(String illustrationName) {
        this.illustrationName = illustrationName;
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

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Map<String, Map<String, List<BusinessCategoryLittleDTO>>> getCategories() {
        return categories;
    }

    public void setCategories(Map<String, Map<String, List<BusinessCategoryLittleDTO>>> categories) {
        this.categories = categories;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getFollowing() {
        return following;
    }

    public void setFollowing(Boolean following) {
        this.following = following;
    }

    public Boolean getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(Boolean open) {
        isOpen = open;
    }

    public List<CustomerInterestDTO> getInterests() {
        return interests;
    }

    public void setInterests(List<CustomerInterestDTO> interests) {
        this.interests = interests;
    }
}
