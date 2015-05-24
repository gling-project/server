package be.lynk.server.service;

import be.lynk.server.model.entities.Address;

import java.util.List;
import java.util.Map;

/**
 * Created by florian on 24/05/15.
 */
public interface LocalizationService {

    boolean validAddress(Address address);

    Map<Address, Long> distanceBetweenAddresses(Address origin, List<Address> destinations);
}
