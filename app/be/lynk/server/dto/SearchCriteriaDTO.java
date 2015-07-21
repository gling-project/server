package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

/**
 * Created by florian on 19/07/15.
 */
public class SearchCriteriaDTO extends DTO {

    private String nameRef;
    private String key;

    public String getNameRef() {
        return nameRef;
    }

    public void setNameRef(String nameRef) {
        this.nameRef = nameRef;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
