package be.flo.project.dto;

import be.flo.project.controller.technical.security.source.SourceEnum;
import be.flo.project.dto.technical.DTO;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by florian on 2/05/15.
 */
public class SessionDTO extends DTO{

    private Date connectionDate;

    private SourceEnum source;

    public SessionDTO() {
    }

    public Date getConnectionDate() {
        return connectionDate;
    }

    public void setConnectionDate(Date connectionDate) {
        this.connectionDate = connectionDate;
    }

    public SourceEnum getSource() {
        return source;
    }

    public void setSource(SourceEnum source) {
        this.source = source;
    }

    @Override
    public String toString() {
        return "SessionDTO{" +
                "connectionDate=" + connectionDate +
                ", source=" + source +
                '}';
    }
}
