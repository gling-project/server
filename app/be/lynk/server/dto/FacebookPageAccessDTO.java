package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import java.util.List;

/**
 * Created by flo on 06/03/16.
 */
public class FacebookPageAccessDTO extends DTO{


    private String access_token;

    private String category;

    private String name;

    private List<String> perms;

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getPerms() {
        return perms;
    }

    public void setPerms(List<String> perms) {
        this.perms = perms;
    }
}
