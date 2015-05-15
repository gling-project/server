package be.flo.project.controller.technical.security.source;

/**
 * Created by florian on 18/04/15.
 */
public enum SourceEnum {

    WEBSITE("???"),
    ANDROID("???");

    private final String key;

    SourceEnum(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    public static SourceEnum getByKey(String key) {
        for (SourceEnum sourceEnum : SourceEnum.values()) {
            if (sourceEnum.key.equals(key)) {
                return sourceEnum;
            }
        }
        return WEBSITE;
    }
}
