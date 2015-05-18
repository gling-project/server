package be.lynk.server.model.entities;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;

/**
 * Created by florian on 19/04/15.
 */
@Entity
public class Role extends AbstractEntity{

    @Enumerated(value = EnumType.STRING)
    private RoleEnum roleEnum;

    public Role() {
    }

    public Role(Account account, RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
    }

    public Role(RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
    }

    public RoleEnum getRoleEnum() {
        return roleEnum;
    }

    public void setRoleEnum(RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Role role = (Role) o;

        if (roleEnum != role.roleEnum) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return roleEnum.hashCode();
    }
}
