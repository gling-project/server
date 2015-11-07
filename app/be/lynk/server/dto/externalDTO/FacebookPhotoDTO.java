package be.lynk.server.dto.externalDTO;

import be.lynk.server.dto.technical.DTO;

import java.util.List;

/**
 * Created by florian on 7/11/15.
 */
public class FacebookPhotoDTO extends DTO {

    private Photo photos;

    public Photo getPhotos() {
        return photos;
    }

    public void setPhotos(Photo photos) {
        this.photos = photos;
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
