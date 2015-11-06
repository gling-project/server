package be.lynk.server.dto.externalDTO;

import be.lynk.server.dto.technical.DTO;

import java.awt.*;
import java.util.List;

/**
 * Created by florian on 6/11/15.
 */
public class FacebookPhotoDTO extends DTO {

    private List<Image> images;

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public static class Image extends DTO {
        private Integer height;
        private Integer width;
        private String  source;

        public Integer getHeight() {
            return height;
        }

        public void setHeight(Integer height) {
            this.height = height;
        }

        public Integer getWidth() {
            return width;
        }

        public void setWidth(Integer width) {
            this.width = width;
        }

        public String getSource() {
            return source;
        }

        public void setSource(String source) {
            this.source = source;
        }
    }
}
