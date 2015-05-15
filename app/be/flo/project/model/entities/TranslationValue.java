package be.flo.project.model.entities;

import be.flo.project.model.entities.technical.AbstractEntity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Created by florian on 19/02/15.
 */
@Entity
public class TranslationValue extends AbstractEntity {

    @ManyToOne
    private Translation translation;

    @Basic(optional = false)
    private String languageCode;

    @Column(columnDefinition = "TEXT")
    @Basic(optional = false)
    private String content;

    public TranslationValue() {
    }

    public Translation getTranslation() {
        return translation;
    }

    public void setTranslation(Translation translation) {
        this.translation = translation;
    }

    public String getLanguageCode() {
        return languageCode;
    }

    public void setLanguageCode(String languageCode) {
        this.languageCode = languageCode;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Translation{" +
                "languageCode='" + languageCode + '\'' +
                ", content='" + content + '\'' +
                '}';
    }


}
