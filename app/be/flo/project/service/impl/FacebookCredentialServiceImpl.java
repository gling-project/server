package be.flo.project.service.impl;

import be.flo.project.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.flo.project.model.entities.Account;
import be.flo.project.model.entities.FacebookCredential;
import be.flo.project.service.FacebookCredentialService;
import be.flo.project.util.httpRequest.FacebookRequest;
import be.flo.project.util.httpRequest.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

/**
 * Created by florian on 3/05/15.
 */
@Repository
public class FacebookCredentialServiceImpl extends CrudServiceImpl<FacebookCredential> implements FacebookCredentialService {

    @Autowired
    private FacebookRequest facebookRequest;

    @Override
    public FacebookCredential findByUserId(String userId) {

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<FacebookCredential> cq = cb.createQuery(FacebookCredential.class);
        Root<FacebookCredential> from = cq.from(FacebookCredential.class);
        cq.select(from);
        cq.where(cb.equal(from.get("userId"), userId));
        return getSingleResultOrNull(cq);
    }

    @Override
    public FacebookTokenAccessControlDTO controlFacebookAccess(String accessToken) {

        return facebookRequest.debugToken(accessToken);
    }

}
