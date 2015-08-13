package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.Account;
import play.modules.mongodb.jackson.KeyTyped;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import java.util.Date;

/**
 * Created by florian on 23/05/15.
 */
public class StoredFileDTO extends DTO implements KeyTyped<Date>, Comparable<StoredFileDTO> {

    private Long id;

    private Boolean isImage;

    private String originalName;

    private String storedName;

    private String comment;

    private Integer fileOrder = 0;

    public Integer getFileOrder() {
        return fileOrder;
    }

    public void setFileOrder(Integer fileOrder) {
        this.fileOrder = fileOrder;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

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

    public String getStoredName() {
        return storedName;
    }

    public void setStoredName(String storedName) {
        this.storedName = storedName;
    }

    @Override
    public String toString() {
        return "StoredFileDTO{" +
                "id=" + id +
                ", isImage=" + isImage +
                ", originalName='" + originalName + '\'' +
                '}';
    }

    @Override
    public int compareTo(StoredFileDTO o) {
        return this.getFileOrder().compareTo(o.getFileOrder());
    }
}
