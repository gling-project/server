package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 26/10/15.
 */
public class UserDetailsBoxDTO extends DTO {

    private List<UserHistoryDTO> list = new ArrayList<>();

    private Map<Integer, Integer> nbSessions = new HashMap<>();

    public List<UserHistoryDTO> getList() {
        return list;
    }

    public void setList(List<UserHistoryDTO> list) {
        this.list = list;
    }

    public Map<Integer, Integer> getNbSessions() {
        return nbSessions;
    }

    public void setNbSessions(Map<Integer, Integer> nbSessions) {
        this.nbSessions = nbSessions;
    }
}
