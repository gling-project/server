package be.lynk.server.dozerConverter;

import org.dozer.CustomConverter;

/**
 * Created by flo on 06/03/16.
 */
public class BusinessFacebookPageAccessTokenConverter implements CustomConverter {

    public Object convert(Object destination, Object source,
                          Class destClass, Class sourceClass) {

        if (source instanceof String && source != null && ((String) source).length() > 0) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
}
