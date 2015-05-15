package be.flo.project.service.impl;

import be.flo.project.model.entities.technical.AbstractEntity;
import be.flo.project.service.CrudService;
import play.db.jpa.JPA;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import java.lang.reflect.ParameterizedType;
import java.util.List;

/**
 * Created by florian on 17/12/14.
 */
public abstract class CrudServiceImpl<T extends AbstractEntity> implements CrudService<T> {


    protected Class<T> entityClass;

    public CrudServiceImpl() {
        ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
        this.entityClass = (Class<T>) genericSuperclass.getActualTypeArguments()[0];
    }

    @Override
    public void saveOrUpdate(T entity) {
        if (entity.getId() == null) {
            JPA.em().persist(entity);
        } else {
            JPA.em().persist(entity);
        }
    }

    @Override
    public T findById(Long id) {
        return JPA.em().find(entityClass, id);
    }

    @Override
    public void remove(T entity) {
        JPA.em().remove(JPA.em().merge(entity));
    }
    
    @Override
    public List<T> findAll() {
        return JPA.em().createNamedQuery("select p from "+entityClass.getName()+" p").getResultList();
    }

    protected T getSingleOrNull(TypedQuery<T> query){
        List<T> resultList = query.getResultList();
        if(resultList.size()==0){
            return null;
        }
        if(resultList.size()>1){
            throw new RuntimeException("more than one result, expected max 1");
        }
        return resultList.get(0);

    }

    protected T getSingleResultOrNull(CriteriaQuery<T> cq) {
        T singleResult;
        try {
            singleResult = JPA.em().createQuery(cq).getSingleResult();
        } catch (NoResultException nre) {
            singleResult = null;
        }
        return singleResult;
    }
}
