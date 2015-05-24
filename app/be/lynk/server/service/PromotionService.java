package be.lynk.server.service;

import be.lynk.server.model.entities.Promotion;

import java.util.List;

/**
 * Created by florian on 23/05/15.
 */
public interface PromotionService extends CrudService<Promotion>{
    List<Promotion> findActivePromotion();
}
