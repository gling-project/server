package be.flo.project.model.entities;

import be.flo.project.model.entities.technical.AbstractEntity;
import be.flo.project.util.Encrypter;
import org.jasypt.util.password.StrongPasswordEncryptor;

import javax.persistence.*;

/**
 * Created by florian on 3/05/15.
 */
@Entity
public class LoginCredential  extends AbstractEntity {

    @OneToOne(optional = false,cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private Account account;

    @Basic
    private boolean keepSessionOpen;

    @Basic(optional =  false)
    private String password;

    @PrePersist
    @PreUpdate
    public void encryptPassword(){
        //generate the password
        if (password.length() < 50) {
            password = Encrypter.generateEncryptingPassword(password);
        }
    }

    public LoginCredential() {
    }

    public LoginCredential(Account account, boolean keepSessionOpen, String password) {
        this.account = account;
        this.keepSessionOpen = keepSessionOpen;
        this.password = password;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public boolean isKeepSessionOpen() {
        return keepSessionOpen;
    }

    public void setKeepSessionOpen(boolean keepSessionOpen) {
        this.keepSessionOpen = keepSessionOpen;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginCredential{" +
                "account=" + account +
                ", keepSessionOpen=" + keepSessionOpen +
                ", password='" + password + '\'' +
                '}';
    }

}
