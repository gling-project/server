package be.lynk.server.model.entities;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.model.entities.converter.I18NLangConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.Encrypter;
import be.lynk.server.util.KeyGenerator;
import play.i18n.Lang;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 10/11/14.
 */
@Entity
public abstract  class Account extends AbstractEntity {


    @Basic(optional = false)
    protected Boolean male;

    @Basic(optional = false)
    protected String firstname;

    @Basic(optional = false)
    protected String lastname;

    @Basic(optional = false)
    @Column(unique = true)
    protected String email;

    @Column(nullable = false, columnDefinition = "character varying(255) NOT NULL DEFAULT 'en'")
    @Convert(converter = I18NLangConverter.class)
    protected Lang lang = Lang.forCode("en");

    @Basic
    protected String authenticationKey;

    @Enumerated(value = EnumType.STRING)
    protected RoleEnum role;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "account", orphanRemoval = true)
    protected Set<Session> sessions;


    @OneToOne(mappedBy = "account", optional = true, cascade = CascadeType.ALL)
    protected LoginCredential loginCredential;


    @OneToOne(mappedBy = "account", optional = true, cascade = CascadeType.ALL)
    protected FacebookCredential facebookCredential;

    @Enumerated(value = EnumType.STRING)
    protected AccountTypeEnum type;


    public Account() {
    }

    public AccountTypeEnum getType() {
        return type;
    }

    public void setType(AccountTypeEnum type) {
        this.type = type;
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

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
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
    public void encryptKey() {

        //crypte the authentication value
        if (authenticationKey != null && authenticationKey.length() < 50) {
            authenticationKey = Encrypter.generateEncryptingPassword(authenticationKey);
        }
        //or generate it
        else if (authenticationKey == null) {
            authenticationKey = Encrypter.generateEncryptingPassword(KeyGenerator.generateRandomKey(40));
        }
    }
}