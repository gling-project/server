package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.Account;

import javax.persistence.Basic;
import javax.persistence.ManyToOne;

/**
 * Created by florian on 23/05/15.
 */
public class StoredFileDTO extends DTO {

    private Long id;

    private Boolean isImage;

    private String originalName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsImage() {
        return isImage;
    }

    public void setIsImage(Boolean isImage) {
        this.isImage = isImage;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    @Override
    public String toString() {
        return "StoredFileDTO{" +
                "id=" + id +
                ", isImage=" + isImage +
                ", originalName='" + originalName + '\'' +
                '}';
    }
}
