package be.flo.project.model.entities;

import be.flo.project.controller.technical.security.role.RoleEnum;
import be.flo.project.model.entities.converter.I18NLangConverter;
import be.flo.project.model.entities.technical.AbstractEntity;
import be.flo.project.util.Encrypter;
import be.flo.project.util.KeyGenerator;
import play.i18n.Lang;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 10/11/14.
 */
@Entity
public class Account extends AbstractEntity {

    @Basic(optional = false)
    private Boolean male;

    @Basic(optional = false)
    private String firstname;

    @Basic(optional = false)
    private String lastname;

    @Basic(optional = false)
    @Column(unique = true)
    private String email;

    @Column(nullable = false,columnDefinition = "character varying(255) NOT NULL DEFAULT 'en'")
    @Convert(converter = I18NLangConverter.class)
    private Lang lang = Lang.forCode("en");

    @Basic
    private String authenticationKey;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "account",orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Role> roles = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "account",orphanRemoval = true)
    private Set<Session> sessions;

    @OneToOne(mappedBy = "account",optional = true,cascade = CascadeType.ALL)
    private LoginCredential loginCredential;


    @OneToOne(mappedBy = "account",optional = true,cascade = CascadeType.ALL)
    private FacebookCredential facebookCredential;


    public Account() {
    }

    public FacebookCredential getFacebookCredential() {
        return facebookCredential;
    }

    public void setFacebookCredential(FacebookCredential facebookCredential) {
        this.facebookCredential = facebookCredential;
    }

    public LoginCredential getLoginCredential() {
        return loginCredential;
    }

    public void setLoginCredential(LoginCredential loginCredential) {
        this.loginCredential = loginCredential;
    }

    public Set<Session> getSessions() {
        return sessions;
    }

    public void setSessions(Set<Session> sessions) {
        this.sessions = sessions;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Boolean getMale() {
        return male;
    }

    public void setMale(Boolean male) {
        this.male = male;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthenticationKey() {
        return authenticationKey;
    }

    public void setAuthenticationKey(String authenticationKey) {
        this.authenticationKey = authenticationKey;
    }

    public Lang getLang() {
        return lang;
    }

    public void setLang(Lang lang) {
        this.lang = lang;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Account account = (Account) o;

        if (!email.equals(account.email)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + email.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Account{" +
                "male=" + male +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", authenticationKey='" + authenticationKey + '\'' +
                ", language='" + lang + '\'' +
                '}';
    }

    @PrePersist
    @PreUpdate
    public void encryptKey(){

        //crypte the authentication value
        if (authenticationKey != null && authenticationKey.length() < 50) {
            authenticationKey = Encrypter.generateEncryptingPassword(authenticationKey);
        }
        //or generate it
        else if(authenticationKey==null){
            authenticationKey = Encrypter.generateEncryptingPassword(KeyGenerator.generateRandomKey(40));
        }
    }
}
