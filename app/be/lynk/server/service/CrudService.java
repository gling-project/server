package be.lynk.server.service;

import be.lynk.server.model.entities.technical.AbstractEntity;

import java.util.List;

/**
 * Created by florian on 17/12/14.
 */
public interface CrudService<T extends AbstractEntity> {

    public void saveOrUpdate(T t);

    public T findById(Long id);

    public void remove(T entity);

    List<T> findAll();
}
