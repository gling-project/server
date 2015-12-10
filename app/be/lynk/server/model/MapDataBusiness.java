package be.lynk.server.model;

import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.BusinessSchedulePart;
import be.lynk.server.model.entities.FollowLink;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

/**
 * Created by florian on 1/09/15.
 */
public class MapDataBusiness {


    private Long id;

    private String name;

    private String illustrationName;

    private String street;

    private String zip;

    private Double posx;

    private Double posy;

    private Boolean isOpen;

    private Boolean following;

    private List<BusinessCategory> businessCategories = new ArrayList<>();

//    private List<CustomerInterestDTO> interests;


    public MapDataBusiness() {
    }

    public MapDataBusiness(java.util.Collection businessCategories){
        int i = 0;

    }
    public MapDataBusiness(BusinessCategory businessCategories){
    }

    public MapDataBusiness(Long id, String name, Double posx, Double posy, String street, String zip, String illustrationName,  AttendanceEnum attendanceEnum
//                           ,FollowLink followLink
            ,BusinessCategory businessCategories
    ) {
        this(id,name,posx,posy,street,zip,illustrationName,attendanceEnum,Arrays.asList(businessCategories));
    }

    public MapDataBusiness(Long id, String name, Double posx, Double posy, String street, String zip, String illustrationName,  AttendanceEnum attendanceEnum) {
        this(id,name,posx,posy,street,zip,illustrationName,attendanceEnum,new ArrayList());
    }

    public MapDataBusiness(Long id, String name, Double posx, Double posy, String street, String zip, String illustrationName,  AttendanceEnum attendanceEnum
//                           ,FollowLink followLink
                           ,java.util.Collection businessCategories
    ) {
        this.id = id;
        this.name = name;
        this.street = street;
        this.zip = zip;
        this.illustrationName = illustrationName;
        this.posx = posx;
        this.posy = posy;
        this.isOpen = attendanceEnum != null && !attendanceEnum.equals(AttendanceEnum.APPOINTMENT);
//        this.following = followLink != null;
        this.businessCategories= new ArrayList(businessCategories);
    }

    public MapDataBusiness(Long id, String name, Double posx, Double posy, String street, String zip, String illustrationName) {
        this.id = id;
        this.name = name;
        this.street = street;
        this.zip = zip;
        this.illustrationName = illustrationName;
        this.posx = posx;
        this.posy = posy;
    }

    public List<BusinessCategory> getBusinessCategories() {
        return businessCategories;
    }

    public void setBusinessCategories(List<BusinessCategory> businessCategories) {
        this.businessCategories = businessCategories;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIllustrationName() {
        return illustrationName;
    }

    public void setIllustrationName(String illustrationName) {
        this.illustrationName = illustrationName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
