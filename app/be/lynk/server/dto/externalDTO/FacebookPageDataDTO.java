package be.lynk.server.dto.externalDTO;

import be.lynk.server.dto.AddressDTO;
import be.lynk.server.dto.technical.DTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 6/11/15.
 */
public class FacebookPageDataDTO extends DTO {

    private String              description;
    private String              phone;
    private AddressDTO          location;
    private Map<String, String> hours;
    private Cover               cover;
    private String              link;
    private String              name;
    private String              category;
    private List<String>        emails;
    private String              website;
    private String              id;
    private Photo               photos;
    private Photo               albums;

    public FacebookPageDataDTO() {
    }

    public Photo getAlbums() {
        return albums;
    }

    public void setAlbums(Photo albums) {
        this.albums = albums;
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

    public AddressDTO getLocation() {
        return location;
    }

    public void setLocation(AddressDTO location) {
        this.location = location;
    }

    public Map<String, String> getHours() {
        return hours;
    }

    public void setHours(Map<String, String> hours) {
        this.hours = hours;
    }

    public Cover getCover() {
        return cover;
    }

    public void setCover(Cover cover) {
        this.cover = cover;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getEmails() {
        return emails;
    }

    public void setEmails(List<String> emails) {
        this.emails = emails;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Photo getPhotos() {
        return photos;
    }

    public void setPhotos(Photo photos) {
        this.photos = photos;
    }

    public static class Cover extends DTO {
        private String  cover_id;
        private Integer offset_x;
        private Integer offset_y;
        private String  source;

        public String getCover_id() {
            return cover_id;
        }

        public void setCover_id(String cover_id) {
            this.cover_id = cover_id;
        }

        public Integer getOffset_x() {
            return offset_x;
        }

        public void setOffset_x(Integer offset_x) {
            this.offset_x = offset_x;
        }

        public Integer getOffset_y() {
            return offset_y;
        }

        public void setOffset_y(Integer offset_y) {
            this.offset_y = offset_y;
        }

        public String getSource() {
            return source;
        }

        public void setSource(String source) {
            this.source = source;
        }
    }

    public static class Photo extends DTO {
        private List<Data> data;

        public List<Data> getData() {
            return data;
        }

        public void setData(List<Data> data) {
            this.data = data;
        }

        public static class Data extends DTO {

            private String id;

            public String getId() {
                return id;
            }

            public void setId(String id) {
                this.id = id;
            }
        }
    }

}
