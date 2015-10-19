package be.lynk.server.util;

/**
 * Created by florian on 17/09/15.
 */
public enum ContactTargetEnum {

    NO_REPLY("no_reply@gling.be","Gling (no reply)"),
    CONTACT("contact@gling.be","Contact"),
    SAV("sav@gling.be","SAV"),
    HELP("help@gling.be","Help");

    private final String email;
    private final String type;

    ContactTargetEnum(String email, String type) {
        this.email = email;
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public String getType() {
        return type;
    }
}
