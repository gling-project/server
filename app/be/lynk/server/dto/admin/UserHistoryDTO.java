package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import java.time.LocalDateTime;
import java.lang.Comparable;

/**
 * Created by florian on 26/10/15.
 */
public class UserHistoryDTO extends DTO implements Comparable<UserHistoryDTO> {

    private Long          accountId;
    private LocalDateTime creationDate;
    private boolean       facebook;
    private int           nbSessions;

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setFacebook(boolean facebook) {
        this.facebook = facebook;
    }

    public boolean isFacebook() {
        return facebook;
    }

    public void setNbSessions(int nbSessions) {
        this.nbSessions = nbSessions;
    }

    public int getNbSessions() {
        return nbSessions;
    }

    @Override
    public int compareTo(UserHistoryDTO o) {
        return o.getCreationDate().compareTo(this.getCreationDate());
    }
}
