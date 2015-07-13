package be.lynk.server.dto;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.util.constants.ValidationRegex;

import javax.persistence.Basic;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;

/**
 * !! IMPORTANT
 * this DTO must  contain only business public datas
 * IMPORTANT !!!
 */
public class BusinessToDisplayDTO extends DTO {

    private Long id;

    private String name;

    private String description;

    private String phone;

    private String website;

    private String email;

    private AddressDTO address;

    private StoredFileDTO illustration;

    private StoredFileDTO landscape;

    private Map<DayOfWeek, List<BusinessSchedulePartDTO>> schedules = new HashMap<>();

    private AbstractPublicationDTO lastPublication;

    private Long distance;

    private BusinessStatus businessStatus;

    protected Date askPublicationDate;

    private Boolean following;

    private Integer totalFollowers;

    private Map<String, Map<String, List<BusinessCategoryLittleDTO>>> categories = new HashMap<>();

    public Boolean getFollowing() {
        return following;
    }

    public void setFollowing(Boolean following) {
        this.following = following;
    }

    public Integer getTotalFollowers() {
        return totalFollowers;
    }

    public void setTotalFollowers(Integer totalFollowers) {
        this.totalFollowers = totalFollowers;
    }

    public Date getAskPublicationDate() {
        return askPublicationDate;
    }

    public void setAskPublicationDate(Date askPublicationDate) {
        this.askPublicationDate = askPublicationDate;
    }

    public BusinessToDisplayDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BusinessStatus getBusinessStatus() {
        return businessStatus;
    }

    public void setBusinessStatus(BusinessStatus businessStatus) {
        this.businessStatus = businessStatus;
    }

    public Map<String, Map<String, List<BusinessCategoryLittleDTO>>> getCategories() {
        return categories;
    }

    public void setCategories(Map<String, Map<String, List<BusinessCategoryLittleDTO>>> categories) {
        this.categories = categories;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getDistance() {
        return distance;
    }

    public void setDistance(Long distance) {
        this.distance = distance;
    }

    public StoredFileDTO getLandscape() {
        return landscape;
    }

    public void setLandscape(StoredFileDTO landscape) {
        this.landscape = landscape;
    }

    public Map<DayOfWeek, List<BusinessSchedulePartDTO>> getSchedules() {
        return schedules;
    }

    public void setSchedules(Map<DayOfWeek, List<BusinessSchedulePartDTO>> schedules) {
        this.schedules = schedules;
    }

    public StoredFileDTO getIllustration() {
        return illustration;
    }

    public AbstractPublicationDTO getLastPublication() {
        return lastPublication;
    }

    public void setLastPublication(AbstractPublicationDTO lastPublication) {
        this.lastPublication = lastPublication;
    }

    public void setIllustration(StoredFileDTO illustration) {
        this.illustration = illustration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "BusinessDTO{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", phone='" + phone + '\'' +
                ", address=" + address +
                ", illustration=" + illustration +
                ", categories=" + categories +
                '}';
    }
}
