package be.lynk.server.dto.admin;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.util.constants.ValidationRegex;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.DayOfWeek;
import java.util.*;

/**
 */
public class BusinessForAdminDTO extends BusinessDTO {

    private Long nbPublication;

    private Long nbPublicationActive;
    private ClaimBusinessDTO claimBusiness;

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
