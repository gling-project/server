package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.StoredFileDTO;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.KeyGenerator;
import be.lynk.server.util.file.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Result;
import play.mvc.Results;

import java.io.File;
import java.io.InputStream;
import java.util.List;

@org.springframework.stereotype.Controller
public class FilesController extends AbstractRestController {


    public static final String[] IMAGE_POST = new String[]{"jpeg","jpg","png"};

    @Autowired
    private StoredFileService storedFileService;

    /**
     * @return
     */
    @Transactional(readOnly = false)
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result upload() {

        MultipartFormData body = Controller.request().body().asMultipartFormData();
        List<MultipartFormData.FilePart> files = body.getFiles();

        StoredFileDTO filesUploadedDTO = null;

        if (files != null) {

            File file = files.get(0).getFile();
            String fileName = files.get(0).getFilename();


            String[] split = fileName.split("\\.");
            String type = split[split.length-1];
            boolean isImage=false;
            for (String s : IMAGE_POST) {
                if(s.equals(type)){
                    isImage=true;
                }
            }

            //Treatment


            //generate the key => test if the key is already used
            String storageKey = null;

            while (storageKey == null || storedFileService.findByStoredName(storageKey) != null) {
                storageKey = KeyGenerator.generateRandomKey(100);
            }

            //create the entity
            StoredFile storedFile = new StoredFile(fileName, storageKey, 0, securityController.getCurrentUser(),isImage);

            //and save
            storedFileService.saveOrUpdate(storedFile);

            //save the file
            FileUtil.save(file, storageKey);

            //complete the result
            filesUploadedDTO = dozerService.map(storedFile,StoredFileDTO.class);
        }
        return Results.ok(filesUploadedDTO);
    }

    /*
      download a file by is storedFileId
     */
//    @SecurityAnnotation(role = RoleEnum.USER)
    @Transactional(readOnly = true)
    public Result download(long storedFileId) {

        //get the storedFile
        StoredFile storedFile = storedFileService.findById(storedFileId);

        Logger.info(storedFile+"");

        if (storedFile == null) {
            throw new RuntimeException("File " + storedFileId + " was not found");
        }

        //TODO control

//        //control
//        if (!storedFile.getAccount().equals(securityController.getCurrentUser())) {
//            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION, storedFileId + "");
//        }

        //create an inputStream
        InputStream inputStream = FileUtil.getFileInputStream(storedFile.getStoredName());

        //launch the download
        Controller.response().setContentType("application/octet-stream");
        Controller.response().setHeader("Content-disposition", "attachment; filename=" + storedFile.getOriginalName());

        return Results.ok(inputStream);
    }

}
