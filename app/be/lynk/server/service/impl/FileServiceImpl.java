package be.lynk.server.service.impl;

import be.lynk.server.dto.StoredFileDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.service.FileService;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.KeyGenerator;
import be.lynk.server.util.file.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Results;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * Created by florian on 7/07/15.
 */
@org.springframework.stereotype.Component
public class FileServiceImpl implements FileService {

    @Autowired
    private StoredFileService storedFileService;

    public static final String[] IMAGE_POST = new String[]{"bmp", "jpeg", "jpg", "png"};

    public StoredFile uploadWithSize(File file, Integer sizex, Integer sizey, Account account) {

        String fileName = file.getName();


        String[] split = fileName.split("\\.");
        String type = split[split.length - 1];
        boolean isImage = false;
        for (String s : IMAGE_POST) {
            if (s.equals(type)) {
                isImage = true;
            }
        }

        //Treatment
        if (sizex != null || sizey != null) {
            try {
                BufferedImage originalImage = ImageIO.read(file);
                int sizexTarget, sizeyTarget;
                if (sizex != null && sizey != null) {
                    sizexTarget = sizex;
                    sizeyTarget = sizey;
                } else if (sizex != null) {
                    sizexTarget = sizex;
                    sizeyTarget = originalImage.getMinY();

                } else {
                    sizeyTarget = sizey;
                    sizexTarget = originalImage.getMinX();
                }
                originalImage = resizeImage(originalImage, originalImage.getType(), sizexTarget, sizeyTarget);
                ImageIO.write(originalImage, type, file);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        //int type = originalImage.getType() == 0? BufferedImage.TYPE_INT_ARGB : originalImage.getType();

        //generate the key => test if the key is already used
        String storageKey = null;

        while (storageKey == null || storedFileService.findByStoredName(storageKey) != null) {
            storageKey = KeyGenerator.generateRandomKey(100);
        }

        //create the entity
        StoredFile storedFile = new StoredFile(fileName, storageKey, 0, account, isImage);

        //and save
        storedFileService.saveOrUpdate(storedFile);

        //save the file
        FileUtil.save(file, storageKey);

        return storedFile;
    }

    private static BufferedImage resizeImage(BufferedImage originalImage, int type, int width, int height) {
        BufferedImage resizedImage = new BufferedImage(width, height, type);
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(originalImage, 0, 0, width, height, null);
        g.dispose();

        return resizedImage;
    }
}
