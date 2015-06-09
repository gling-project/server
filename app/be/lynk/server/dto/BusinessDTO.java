package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.util.constants.ValidationRegex;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

/**
 */
public class BusinessDTO extends DTO {

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2, max = 250, message = "--.validation.dto.size")
    private String name;

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2, max = 1500, message = "--.validation.dto.size")
    private String description;

    @NotNull(message = "--.validation.dto.notNull")
    @Pattern(regexp = ValidationRegex.PHONE, message = "--.validation.dto.phone")
    private String phone;

    private AddressDTO address;

    private StoredFileDTO illustration;

    private List<BusinessScheduleDTO> businessSchedules;

    private Integer totalFollowers;

    public BusinessDTO() {
    }

    public Integer getTotalFollowers() {
        return totalFollowers;
    }

    public void setTotalFollowers(Integer totalFollowers) {
        this.totalFollowers = totalFollowers;
    }

    public List<BusinessScheduleDTO> getBusinessSchedules() {
        return businessSchedules;
    }

    public void setBusinessSchedules(List<BusinessScheduleDTO> businessSchedules) {
        this.businessSchedules = businessSchedules;
    }

    public StoredFileDTO getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFileDTO illustration) {
        this.illustration = illustration;
    }

    private List<BusinessCategoryDTO> businessCategories = new ArrayList<>();

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
