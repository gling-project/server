package be.lynk.server.service;

import be.lynk.server.model.entities.StoredFile;

public interface StoredFileService extends CrudService<StoredFile> {

    public StoredFile findByStoredName(String storedName);
}
