package be.flo.project.dto;

import be.flo.project.dto.technical.DTO;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by florian on 11/11/14.
 */
public class ListDTO<T extends DTO> extends DTO {

    private Collection<T> list = new HashSet<>();

    public ListDTO() {
    }

    public ListDTO(Collection<T> list) {
        this.list = list;
    }

    public Collection<T> getList() {
        return list;
    }

    public void setList(Collection<T> list) {
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
