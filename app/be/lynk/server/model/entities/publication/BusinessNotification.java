package be.lynk.server.model.entities.publication;

import be.lynk.server.model.PublicationTypeEnum;

import javax.persistence.Entity;

/**
 * Created by florian on 1/06/15.
 */
@Entity
public class BusinessNotification extends AbstractPublication{

    public BusinessNotification() {
        type = PublicationTypeEnum.NOTIFICATION;
    }
}
