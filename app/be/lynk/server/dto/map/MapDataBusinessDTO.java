package be.lynk.server.dto.map;

import be.lynk.server.dto.AddressDTO;
import be.lynk.server.dto.BusinessCategoryLittleDTO;
import be.lynk.server.dto.CustomerInterestDTO;
import be.lynk.server.dto.StoredFileDTO;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.AttendanceEnum;
import be.lynk.server.model.entities.CustomerInterest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 20/11/15.
 */
public class MapDataBusinessDTO extends DTO {

    private Long id;

    private String name;

    private StoredFileDTO illustration;

    private AddressDTO address;

    private Boolean following;

    private AttendanceEnum attendance;

    private List<CustomerInterestDTO> interests;

    private Map<String, Map<String, List<BusinessCategoryLittleDTO>>> categories = new HashMap<>();

    public MapDataBusinessDTO() {
    }

    public Map<String, Map<String, List<BusinessCategoryLittleDTO>>> getCategories() {
        return categories;
    }

    public void setCategories(Map<String, Map<String, List<BusinessCategoryLittleDTO>>> categories) {
        this.categories = categories;
    }

    public StoredFileDTO getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFileDTO illustration) {
        this.illustration = illustration;
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

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    public Boolean getFollowing() {
        return following;
    }

    public void setFollowing(Boolean following) {
        this.following = following;
    }

    public AttendanceEnum getAttendance() {
        return attendance;
    }

    public void setAttendance(AttendanceEnum attendance) {
        this.attendance = attendance;
    }

    public List<CustomerInterestDTO> getInterests() {
        return interests;
    }

    public void setInterests(List<CustomerInterestDTO> interests) {
        this.interests = interests;
    }
}
