package be.lynk.server.controller.technical.businessStatus;

/**
 * Created by florian on 5/07/15.
 */
public enum  BusinessStatus {

    NOT_PUBLISHED("--.business.status.not_public"),
    WAITING_CONFIRMATION("--.business.status.waiting_confirmation"),
    PUBLISHED("--.business.status.published");

    private final String translationName;

    BusinessStatus(String translationName) {
        this.translationName = translationName;
    }

    public String getTranslationName() {
        return translationName;
    }
}
