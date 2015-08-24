package be.lynk.server.model.entities;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.model.GenderEnum;
import be.lynk.server.model.entities.converter.I18NLangConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.Encrypter;
import be.lynk.server.util.KeyGenerator;
import play.i18n.Lang;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 10/11/14.
 */
@Entity
public class Account extends AbstractEntity {


    @Basic(optional = false)
    @Enumerated(value = EnumType.STRING)
    protected GenderEnum gender;

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

    @OneToOne(mappedBy = "account", optional = true, cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    protected LoginCredential loginCredential;

    @OneToOne(mappedBy = "account", optional = true, cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    protected FacebookCredential facebookCredential;

    @Enumerated(value = EnumType.STRING)
    protected AccountTypeEnum type;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true,mappedBy = "account")
    private Set<Address> addresses = new HashSet<>();

    @ManyToMany()
    private Set<CustomerInterest> customerInterests = new HashSet<>();

    @Basic(optional = false)
    private Boolean sendNotificationByDefault = true;

    @ManyToOne
    private Address selectedAddress;


    public Account() {
    }

    public Address getSelectedAddress() {
        return selectedAddress;
    }

    public void setSelectedAddress(Address selectedAddress) {
        this.selectedAddress = selectedAddress;
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

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
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

    public Set<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public Set<CustomerInterest> getCustomerInterests() {
        return customerInterests;
    }

    public void setCustomerInterests(Set<CustomerInterest> customerInterests) {
        this.customerInterests = customerInterests;
    }

    public Boolean getSendNotificationByDefault() {
        return sendNotificationByDefault;
    }

    public void setSendNotificationByDefault(Boolean sendNotificationByDefault) {
        this.sendNotificationByDefault = sendNotificationByDefault;
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
                "gender=" + gender +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", lang=" + lang +
                ", authenticationKey='" + authenticationKey + '\'' +
                ", role=" + role +
                ", loginCredential=" + loginCredential +
                ", facebookCredential=" + facebookCredential +
                ", type=" + type +
                ", sendNotificationByDefault=" + sendNotificationByDefault +
                "} " + super.toString();
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
