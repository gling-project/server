package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;


import java.util.*;

/**
 * Created by florian on 11/11/14.
 */
public class ListDTO<T extends DTO> extends DTO  {

    private List<T> list = new ArrayList<>();

    public ListDTO() {
    }

    public ListDTO(List<T> list) {
        this.list = list;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public void addElement(T dto) {
        list.add(dto);
    }

    @Override
    public String toString() {
        return "ListDTO{" +
                "list=" + list +
                '}';
    }
}
