package be.lynk.server.dto;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.constants.ValidationRegex;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Created by florian on 11/11/14.
 */
public class AccountDTO extends DTO {

    private Long id;

    @NotNull(message = "--.validation.dto.notNull")
    private Boolean male;

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2,max =50,message = "--.validation.dto.size")
    private String firstname;

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2,max =50,message = "--.validation.dto.size")
    private String lastname;

    @NotNull(message = "--.validation.dto.notNull")
    @Pattern(regexp = ValidationRegex.EMAIL,message = "--.validation.dto.email")
    private String email;

    private RoleEnum role;

    private LangDTO lang;

    private AccountTypeEnum type;

    public AccountDTO() {
    }

    public AccountTypeEnum getType() {
        return type;
    }

    public void setType(AccountTypeEnum type) {
        this.type = type;
    }

    public Boolean getMale() {
        return male;
    }

    public void setMale(Boolean male) {
        this.male = male;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public LangDTO getLang() {
        return lang;
    }

    public void setLang(LangDTO lang) {
        this.lang = lang;
    }

    @Override
    public String toString() {
        return "AccountDTO{" +
                "id=" + id +
                ", male=" + male +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", roles=" + role +
                ", lang=" + lang +
                '}';
    }
}
