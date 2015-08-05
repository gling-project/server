package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Address;
import be.lynk.server.service.AddressService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

/**
 * Created by florian on 20/05/15.
 */
@Service
public class AddressServiceImpl extends CrudServiceImpl<Address> implements AddressService {

    @Override
    public Address findByNameAndAccount(String name, Account currentUser) {
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<Address> cq = cb.createQuery(Address.class);
        Root<Address> from = cq.from(Address.class);
        cq.select(from);
        cq.where(cb.equal(from.get("name"), name));
        return getSingleResultOrNull(cq);
    }
}
