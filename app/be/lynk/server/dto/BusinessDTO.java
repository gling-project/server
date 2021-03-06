package be.lynk.server.dto;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.util.constants.ValidationRegex;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.DayOfWeek;
import java.util.*;

/**
 */
public class BusinessDTO extends DTO  {

    private Long id;

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2, max = 250, message = "--.validation.dto.size")
    private String name;

    @NotNull(message = "--.validation.dto.notNull")
    private String description;

    @NotNull(message = "--.validation.dto.notNull")
    @Pattern(regexp = ValidationRegex.PHONE, message = "--.validation.dto.phone")
    private String phone;

//    @Pattern(regexp = ValidationRegex.EMAIL, message = "--.validation.dto.email")
    private String email;

    @Pattern(regexp = ValidationRegex.URL_OR_NULL, message = "--.validation.dto.url")
    private String website;

    //@Pattern(regexp = ValidationRegex.VAT, message = "--.validation.dto.vta")
    private String vta;

    private AddressDTO address;

    private StoredFileDTO illustration;

    private StoredFileDTO landscape;

    private Map<DayOfWeek, List<BusinessSchedulePartDTO>> schedules = new HashMap<>();

    private Integer totalFollowers;

    private List<BusinessCategoryDTO> businessCategories = new ArrayList<>();

    private BusinessStatusEnum businessStatus;

    protected Date askPublicationDate;

    private BusinessSocialNetworkDTO socialNetwork;

    protected Date creationDate;

    private Boolean hasFacebookPageAccess;

    public BusinessDTO() {
    }

    public Boolean getHasFacebookPageAccess() {
        return hasFacebookPageAccess;
    }

    public void setHasFacebookPageAccess(Boolean hasFacebookPageAccess) {
        this.hasFacebookPageAccess = hasFacebookPageAccess;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getAskPublicationDate() {
        return askPublicationDate;
    }

    public void setAskPublicationDate(Date askPublicationDate) {
        this.askPublicationDate = askPublicationDate;
    }

    public String getVta() {
        return vta;
    }

    public void setVta(String vta) {
        this.vta = vta;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BusinessStatusEnum getBusinessStatus() {
        return businessStatus;
    }

    public void setBusinessStatus(BusinessStatusEnum businessStatus) {
        this.businessStatus = businessStatus;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public StoredFileDTO getLandscape() {
        return landscape;
    }

    public void setLandscape(StoredFileDTO landscape) {
        this.landscape = landscape;
    }

    public Integer getTotalFollowers() {
        return totalFollowers;
    }

    public void setTotalFollowers(Integer totalFollowers) {
        this.totalFollowers = totalFollowers;
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

    public void setIllustration(StoredFileDTO illustration) {
        this.illustration = illustration;
    }

    public List<BusinessCategoryDTO> getBusinessCategories() {
        return businessCategories;
    }

    public void setBusinessCategories(List<BusinessCategoryDTO> businessCategories) {
        this.businessCategories = businessCategories;
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

    public BusinessSocialNetworkDTO getSocialNetwork() {
        return socialNetwork;
    }

    public void setSocialNetwork(BusinessSocialNetworkDTO socialNetwork) {
        this.socialNetwork = socialNetwork;
    }

    @Override
    public String toString() {
        return "BusinessDTO{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", phone='" + phone + '\'' +
                ", address=" + address +
                ", illustration=" + illustration +
                ", businessCategories=" + businessCategories +
                '}';
    }
}
