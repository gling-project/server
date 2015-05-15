package be.flo.project.model.entities;

import be.flo.project.controller.technical.security.source.SourceEnum;
import be.flo.project.model.entities.converter.LocalDateTimePersistenceConverter;
import be.flo.project.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by florian on 4/12/14.
 */
@Entity
public class Session extends AbstractEntity {

    @ManyToOne(optional = false)
    private Account account;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    private LocalDateTime connectionDate;

    @Enumerated(value = EnumType.STRING)
    private SourceEnum source;


    public Session() {
    }

    public Session(Account account, SourceEnum source) {
        this.account = account;
        connectionDate = LocalDateTime.now();
        this.source = source;
    }

    public SourceEnum getSource() {
        return source;
    }

    public void setSource(SourceEnum source) {
        this.source = source;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public LocalDateTime getConnectionDate() {
        return connectionDate;
    }

    public void setConnectionDate(LocalDateTime connectionDate) {
        this.connectionDate = connectionDate;
    }

    @Override
    public String toString() {
        return "Session{" +
                "account=" + account +
                ", connectionDate=" + connectionDate +
                '}';
    }
}
