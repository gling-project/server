package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import java.util.Map;

/**
 * Created by florian on 9/11/15.
 */
public class InterestStatDTO extends DTO {

    private Map<String, Integer> from7;

    private Map<String, Integer> from14;

    private Map<String, Integer> from28;
    private Map<String, Integer> from1;

    public Map<String, Integer> getFrom7() {
        return from7;
    }

    public void setFrom7(Map<String, Integer> from7) {
        this.from7 = from7;
    }

    public Map<String, Integer> getFrom14() {
        return from14;
    }

    public void setFrom14(Map<String, Integer> from14) {
        this.from14 = from14;
    }

    public Map<String, Integer> getFrom28() {
        return from28;
    }

    public void setFrom28(Map<String, Integer> from28) {
        this.from28 = from28;
    }

    public void setFrom1(Map<String, Integer> from1) {
        this.from1 = from1;
    }

    public Map<String, Integer> getFrom1() {
        return from1;
    }
}
