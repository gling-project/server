package be.lynk.server.service;

import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Address;
import be.lynk.server.model.entities.Business;

import java.util.List;
import java.util.Map;

/**
 * Created by florian on 24/05/15.
 */
public interface LocalizationService {

    void validAddress(Address address) throws Exception;

    Map<Business, Long> distanceBetweenAddresses(Address origin, List<Business> destinations);

    Long distanceBetweenAddress(Position origin, Address destination);

    Map<Business, Long> distanceBetweenAddresses(Position origin, List<Business> destinations);
}
