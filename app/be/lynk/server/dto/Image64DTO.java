package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

/**
 * Created by florian on 18/10/15.
 */
public class Image64DTO extends DTO {

    private String image;
    private String name;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
