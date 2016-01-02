package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import java.time.LocalDateTime;
import java.lang.Comparable;
import java.util.Date;

/**
 * Created by florian on 26/10/15.
 */
public class UserHistoryDTO extends DTO implements Comparable<UserHistoryDTO> {

    private Long    accountId;
    private Date    creationDate;
    private boolean facebook;
    private int     nbSessions;
    private long    nbFollow;
    private long    nbAddresses;
    private boolean sharePosition = false;
    private String email;

    public UserHistoryDTO() {
    }

    public long getNbFollow() {
        return nbFollow;
    }

    public void setNbFollow(long nbFollow) {
        this.nbFollow = nbFollow;
    }

    public long getNbAddresses() {
        return nbAddresses;
    }

    public void setNbAddresses(long nbAddresses) {
        this.nbAddresses = nbAddresses;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
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
        return this.getCreationDate().compareTo(o.getCreationDate());
    }

    public void setSharePosition(boolean sharePosition) {
        this.sharePosition = sharePosition;
    }

    public boolean getSharePosition() {
        return sharePosition;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
