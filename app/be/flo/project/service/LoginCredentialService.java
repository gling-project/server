package be.flo.project.service;

import be.flo.project.model.entities.LoginCredential;

/**
 * Created by florian on 3/05/15.
 */
public interface LoginCredentialService extends CrudService<LoginCredential>{
    boolean controlPassword(String password, LoginCredential loginCredential);
}
