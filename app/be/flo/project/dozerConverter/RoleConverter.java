package be.flo.project.dozerConverter;

import be.flo.project.controller.technical.security.role.RoleEnum;
import be.flo.project.model.entities.Role;
import org.dozer.CustomConverter;
import org.dozer.DozerConverter;

/**
 * Created by florian on 16/04/15.
 */
public class RoleConverter extends DozerConverter<Role, RoleEnum> implements CustomConverter {

    public RoleConverter() {
        super(Role.class, RoleEnum.class);
    }


    @Override
    public RoleEnum convertTo(Role role, RoleEnum roleEnum) {
        return role.getRoleEnum();
    }

    @Override
    public Role convertFrom(RoleEnum roleEnum, Role role) {
        return new Role(roleEnum);
    }
}
