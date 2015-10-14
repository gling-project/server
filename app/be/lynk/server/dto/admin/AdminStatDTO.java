package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

/**
 * Created by florian on 14/10/15.
 */
public class AdminStatDTO extends DTO{

    private Map<String, String> stats = new LinkedHashMap<>();

    public Map<String, String> getStats() {
        return stats;
    }

    public void setStats(Map<String, String> stats) {
        this.stats = stats;
    }
}
