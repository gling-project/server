package be.flo.project.util.message;

/**
 * Created by florian on 11/11/14.
 */
public enum EmailMessageEnum {
    ;

    private final String key;

    EmailMessageEnum(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

}
