package be.flo.project.model.entities;

import be.flo.project.model.entities.technical.AbstractEntity;

import javax.persistence.*;

@Entity
public class StoredFile extends AbstractEntity {

    private static final long serialVersionUID = 1L;

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

    public StoredFile(String originalName, String storedName, Integer size, Account account) {
        this.originalName = originalName;
        this.storedName = storedName;
        this.size = size;
        this.account = account;
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
