package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 18/05/15.
 */
public class BusinessCategoryWithInterestDTO extends BusinessCategoryDTO {

    public List<InterestWithPriority> interests = new ArrayList<>();


    public BusinessCategoryWithInterestDTO() {
    }

    public List<InterestWithPriority> getInterests() {
        return interests;
    }

    public void setInterests(List<InterestWithPriority> interests) {
        this.interests = interests;
    }

    public static class InterestWithPriority {
        private CustomerInterestDTO interest;
        private Integer             priority;

        public InterestWithPriority() {
        }

        public InterestWithPriority(CustomerInterestDTO interest, Integer priority) {
            this.interest = interest;
            this.priority = priority;
        }

        public CustomerInterestDTO getInterest() {
            return interest;
        }

        public void setInterest(CustomerInterestDTO interest) {
            this.interest = interest;
        }

        public Integer getPriority() {
            return priority;
        }

        public void setPriority(Integer priority) {
            this.priority = priority;
        }
    }
}
