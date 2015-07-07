package be.lynk.server.service;

import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.StoredFile;
import play.mvc.Result;

import java.io.File;

/**
 * Created by florian on 7/07/15.
 */
public interface FileService {

    StoredFile uploadWithSize(File file, Integer sizex, Integer sizey, Account account);
}
