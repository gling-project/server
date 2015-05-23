package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;

@Entity
public class StoredFile extends AbstractEntity {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    private Boolean isImage;

    @Basic(optional = false)
    private String originalName;

    @Basic(optional = false)
    private String storedName;

    @Basic
    private Integer size;

    @ManyToOne(optional = false)
    private Account account;


    public StoredFile() {
    }

    public StoredFile(String originalName, String storedName, Integer size, Account account, Boolean isImage) {
        this.originalName = originalName;
        this.storedName = storedName;
        this.size = size;
        this.account = account;
        this.isImage=isImage;
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

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return "StoredFile{" +
                super.toString() +
                "originalName='" + originalName + '\'' +
                ", storedName='" + storedName + '\'' +
                ", size=" + size +
                ", account=" + account +
                '}';
    }
}
