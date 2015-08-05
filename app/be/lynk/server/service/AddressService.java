package be.lynk.server.service;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Address;

/**
 * Created by florian on 20/05/15.
 */
public interface AddressService extends CrudService<Address> {
    Address findByNameAndAccount(String name, Account currentUser);
}
