package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import javax.xml.crypto.Data;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

/**
 * Created by florian on 14/10/15.
 */
public class AdminStatDTO extends DTO {

    private Map<String, Data> stats = new LinkedHashMap<>();

    public Map<String, Data> getStats() {
        return stats;
    }

    public void setStats(Map<String, Data> stats) {
        this.stats = stats;
    }


    public static class Data {
        private double value1;
        private double value2;

        public Data() {
        }

        public Data(double value1) {
            this.value1 = value1;
        }

        public Data(double value1, double value2) {
            this.value1 = value1;
            this.value2 = value2;
        }

        public double getValue1() {
            return value1;
        }

        public void setValue1(double value1) {
            this.value1 = value1;
        }

        public double getValue2() {
            return value2;
        }

        public void setValue2(double value2) {
            this.value2 = value2;
        }

        public static Data createPercent(Double v1, Double total) {
            return new Data(v1, v1 / total);
        }

        public static Data createPercent(Long aLong, Long nbTotalPublication) {
            return createPercent(aLong.doubleValue(), nbTotalPublication.doubleValue());

        }

        public static Data createPercent(Integer i, Integer nbSessions) {
            return createPercent(i.doubleValue(), nbSessions.doubleValue());
        }
    }
}
