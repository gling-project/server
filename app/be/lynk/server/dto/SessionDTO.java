package be.lynk.server.dto;

import be.lynk.server.controller.technical.security.source.SourceEnum;
import be.lynk.server.dto.technical.DTO;

import java.util.Date;

/**
 * Created by florian on 2/05/15.
 */
public class SessionDTO extends DTO {

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
