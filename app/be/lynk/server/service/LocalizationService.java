package be.lynk.server.service;

import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Address;

import java.util.List;
import java.util.Map;

/**
 * Created by florian on 24/05/15.
 */
public interface LocalizationService {

    void validAddress(Address address) throws Exception;

    Map<Address, Long> distanceBetweenAddresses(Address origin, List<Address> destinations);

    Long distanceBetweenAddress(Position origin, Address destination);

    Map<Address, Long> distanceBetweenAddresses(Position origin, List<Address> destinations);
}
