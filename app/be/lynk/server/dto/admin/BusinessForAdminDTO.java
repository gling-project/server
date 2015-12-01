package be.lynk.server.dto.admin;

import be.lynk.server.dto.BusinessDTO;
import be.lynk.server.dto.ClaimBusinessDTO;

/**
 */
public class BusinessForAdminDTO extends BusinessDTO {

    private Long nbPublication;

    private Long nbPublicationActive;

    private Boolean hasOwner;

    private Boolean isClaimed;

    public BusinessForAdminDTO() {
    }

    public Boolean getIsClaimed() {
        return isClaimed;
    }

    public void setIsClaimed(Boolean claimed) {
        isClaimed = claimed;
    }

    public Boolean getHasOwner() {
        return hasOwner;
    }

    public void setHasOwner(Boolean hasOwner) {
        this.hasOwner = hasOwner;
    }

    public Long getNbPublication() {
        return nbPublication;
    }

    public void setNbPublication(Long nbPublication) {
        this.nbPublication = nbPublication;
    }

    public Long getNbPublicationActive() {
        return nbPublicationActive;
    }

    public void setNbPublicationActive(Long nbPublicationActive) {
        this.nbPublicationActive = nbPublicationActive;
    }


}
