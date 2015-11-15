package be.lynk.server.dozerConverter;

import be.lynk.server.model.entities.Business;
import org.dozer.CustomConverter;

/**
 * Created by florian on 21/06/15.
 */
public class BusinessToIdConverter implements CustomConverter {

    @Override
    public Object convert(Object destination, Object source,
                          Class destClass, Class sourceClass) {

        if (source !=null && source instanceof Business) {
            return ((Business) source).getId();
        } else {
            //TODO ?
            return null;
        }
    }
}
