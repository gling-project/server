package be.flo.project.controller.technical.security.role;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 18/04/15.
 */
public enum RoleEnum {

    USER,
    ADMIN(USER),
    SUPER_ADMIN(ADMIN);


    private List<RoleEnum> children;

    RoleEnum(RoleEnum... children) {
        this.children = new ArrayList<>();
        for (RoleEnum child : children) {
            this.children.add(child);
        }
    }

    public List<RoleEnum> getChildren() {
        return children;
    }
}
