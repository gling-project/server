package be.lynk.server.dto.admin;

import be.lynk.server.dto.BusinessDTO;
import be.lynk.server.dto.ClaimBusinessDTO;

/**
 */
public class BusinessForAdminDTO extends BusinessDTO {

    private Long nbPublication;

    private Long nbPublicationActive;
    private ClaimBusinessDTO claimBusiness;

    private Boolean hasOwner;

    public BusinessForAdminDTO() {
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

    public void setClaimBusiness(ClaimBusinessDTO claimBusiness) {
        this.claimBusiness = claimBusiness;
    }

    public ClaimBusinessDTO getClaimBusiness() {
        return claimBusiness;
    }
}
