package be.lynk.server.dozerConverter;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.model.entities.Role;
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
        if(role==null){
            return null;
        }
        return role.getRoleEnum();
    }

    @Override
    public Role convertFrom(RoleEnum roleEnum, Role role) {
        if(roleEnum==null){
            return null;
        }
        return new Role(roleEnum);
    }
}
