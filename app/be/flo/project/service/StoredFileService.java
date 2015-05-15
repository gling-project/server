package be.flo.project.service;

import be.flo.project.model.entities.StoredFile;

public interface StoredFileService extends CrudService<StoredFile> {

    public StoredFile findByStoredName(String storedName);
}
