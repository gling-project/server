package be.lynk.server.service;

import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.BusinessNotification;

import java.util.List;

/**
 * Created by florian on 1/06/15.
 */
public interface BusinessNotificationService extends CrudService<BusinessNotification> {

    List<BusinessNotification> findActiveNotification();
}
