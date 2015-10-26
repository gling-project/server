package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import javax.management.openmbean.TabularData;
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

    private Map<Long, Integer> nbFollows = new HashMap<>();

    private Map<Long, Integer> nbAddresses = new HashMap<>();
    private int total;

    public UserDetailsBoxDTO() {
    }

    public Map<Long, Integer> getNbAddresses() {
        return nbAddresses;
    }

    public void setNbAddresses(Map<Long, Integer> nbAddresses) {
        this.nbAddresses = nbAddresses;
    }

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

    public Map<Long,Integer> getNbFollows() {
        return nbFollows;
    }

    public void setNbFollows(Map<Long, Integer> nbFollows) {
        this.nbFollows = nbFollows;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getTotal() {
        return total;
    }
}
