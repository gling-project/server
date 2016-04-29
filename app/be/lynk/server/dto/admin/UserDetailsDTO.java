package be.lynk.server.dto.admin;

import be.lynk.server.dto.technical.DTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 26/10/15.
 */
public class UserDetailsDTO extends DTO {

    private  UserDetailsBoxDTO today;

    private  UserDetailsBoxDTO week;

    private  UserDetailsBoxDTO all;

    public UserDetailsBoxDTO getToday() {
        return today;
    }

    public void setToday(UserDetailsBoxDTO today) {
        this.today = today;
    }

    public UserDetailsBoxDTO getWeek() {
        return week;
    }

    public void setWeek(UserDetailsBoxDTO week) {
        this.week = week;
    }

    public UserDetailsBoxDTO getAll() {
        return all;
    }

    public void setAll(UserDetailsBoxDTO all) {
        this.all = all;
    }
}
