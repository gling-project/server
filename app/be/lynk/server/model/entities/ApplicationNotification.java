package be.lynk.server.model.entities;

import be.lynk.server.model.entities.converter.I18NLangConverter;
import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;
import be.lynk.server.util.ApplicationNotificationTypeEnum;
import play.i18n.Lang;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by flo on 17/12/15.
 */
@Entity
public class ApplicationNotification extends AbstractEntity {


    @Enumerated(value = EnumType.STRING)
    private ApplicationNotificationTypeEnum type;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    private LocalDateTime date;

    @Column(nullable = false, columnDefinition = "character varying(255) NOT NULL DEFAULT 'en'")
    @Convert(converter = I18NLangConverter.class)
    protected Lang lang = Lang.forCode("en");

    @Basic
    private String targetData;

    @Basic
    private String alert;

    @Basic
    private String title;

    @Basic
    private Boolean wasSent;

    public ApplicationNotification() {
    }

    public Lang getLang() {
        return lang;
    }

    public void setLang(Lang lang) {
        this.lang = lang;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getAlert() {
        return alert;
    }

    public void setAlert(String alert) {
        this.alert = alert;
    }

    public String getTargetData() {
        return targetData;
    }

    public void setTargetData(String targetData) {
        this.targetData = targetData;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ApplicationNotificationTypeEnum getType() {
        return type;
    }

    public void setType(ApplicationNotificationTypeEnum type) {
        this.type = type;
    }

    public Boolean getWasSent() {
        return wasSent;
    }

    public void setWasSent(Boolean wasSent) {
        this.wasSent = wasSent;
    }
}
