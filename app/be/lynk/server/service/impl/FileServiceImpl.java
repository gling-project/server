package be.lynk.server.service.impl;

import be.lynk.server.dto.StoredFileDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.service.FileService;
import be.lynk.server.service.StoredFileService;
import be.lynk.server.util.KeyGenerator;
import be.lynk.server.util.file.FileUtil;
import ij.IJ;
import ij.ImagePlus;
import ij.io.FileInfo;
import ij.io.Opener;
import ij.process.ImageProcessor;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.resizers.configurations.Antialiasing;
import net.coobird.thumbnailator.resizers.configurations.Rendering;
import net.coobird.thumbnailator.resizers.configurations.ScalingMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import play.api.libs.Files;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Results;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
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

    @Override
    public StoredFile uploadWithSize(play.mvc.Http.MultipartFormData.FilePart filePart, Account account) {
        String fileName = filePart.getFilename();
        File file = filePart.getFile();
        return uploadWithSize(file, fileName, account);

    }

    @Override
    public StoredFile uploadWithSize(File file, String fileName, Account account) {
        return uploadWithSize(file, fileName, null, null, account);

    }

    @Override
    public StoredFile uploadWithSize(play.mvc.Http.MultipartFormData.FilePart filePart, Integer sizex, Integer sizey, Account account) {

        String fileName = filePart.getFilename();
        File file = filePart.getFile();

        return uploadWithSize(file, fileName, sizex, sizey, account);
    }

    @Override
    public StoredFile uploadWithSize(File file, String fileName, Integer sizex, Integer sizey, Account account) {

        String[] split = fileName.split("\\.");
        String type = split[split.length - 1];
        File resizeFile = null;

        boolean isImage = false;
        for (String s : IMAGE_POST) {
            if (s.equalsIgnoreCase(type)) {
                isImage = true;
            }
        }

        //create the entity
        StoredFile storedFile = new StoredFile(fileName, generateStorageKey(), 0, account, isImage);


        //Treatment
        if (sizex != null || sizey != null) {

            //start to save the original file
            storedFile.setStoredNameOriginalSize(generateStorageKey());
            FileUtil.save(file, storedFile.getStoredNameOriginalSize());

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
                originalImage = resizeImage(originalImage
//                        , originalImage.getType()
                        , sizexTarget
                        , sizeyTarget
                        , RenderingHints.VALUE_RENDER_QUALITY
                        , true);
                ImageIO.write(originalImage, type, file);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        //int type = originalImage.getType() == 0? BufferedImage.TYPE_INT_ARGB : originalImage.getType();


        //and save
        storedFileService.saveOrUpdate(storedFile);

        FileUtil.save(file, storedFile.getStoredName());


        return storedFile;
    }

//    private static BufferedImage resizeImage(BufferedImage originalImage, int type, int width, int height) {
//        BufferedImage resizedImage = new BufferedImage(width, height, type);
//        Graphics2D g = resizedImage.createGraphics();
//        g.drawImage(originalImage, 0, 0, width, height, null);
//        g.dispose();
//
//        return resizedImage;
//    }

    ImagePlus openUsingImageIO(String name, BufferedImage img) {
        ImagePlus imp = null;

        if (img == null) {
            return null;
        } else {
            if (img.getColorModel().hasAlpha()) {
                int fi = img.getWidth();
                int height = img.getHeight();
                BufferedImage bi = new BufferedImage(fi, height, 2);
                Graphics g = bi.getGraphics();
                g.setColor(Color.white);
                g.fillRect(0, 0, fi, height);
                g.drawImage(img, 0, 0, (ImageObserver) null);
                img = bi;
            }

            imp = new ImagePlus(name, img);
            FileInfo fi1 = new FileInfo();
            fi1.fileFormat = 9;
            fi1.fileName = name;
            fi1.directory = name;//f.getParent() + File.separator;
            imp.setFileInfo(fi1);
            return imp;
        }
    }

    public BufferedImage resizeImage(BufferedImage img,
                                     int targetWidth,
                                     int targetHeight,
                                     Object hint,
                                     boolean higherQuality) {

        try {
            return Thumbnails.of(img)//new URL("http://i.stack.imgur.com/X0aPT.jpg"))
                    .height(targetHeight)
                    .width(targetWidth)
                    .antialiasing(Antialiasing.ON)
                    .rendering(Rendering.QUALITY)
//                    .scalingMode(ScalingMode.BICUBIC)
                    .asBufferedImage();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("caca");
        }

        // public static void processPicture(String inputFile, String outputFilePath, double scaleFactor, int interpolationMethod, double sigmaFactor) {

//        processPicture("X0aPT.jpg", "output.jpg", 0.0198, ImageProcessor.NONE, 0.3);

//        ImageProcessor ip = openUsingImageIO("merde", img).getProcessor();//opener.openImage(inputFile).getProcessor();
//        ip.blurGaussian( 0.0198/ 0.3);
//        ip.setInterpolationMethod(ImageProcessor.NONE);
//
//        ImageProcessor outputProcessor = ip.resize(targetWidth, targetHeight);
//        ImagePlus imagePlus = new ImagePlus("", outputProcessor);
//
//        return imagePlus.getBufferedImage();
//        ip.getBufferedImage();
//            IJ.saveAs(, outputFilePath.substring(outputFilePath.lastIndexOf('.') + 1), outputFilePath);


//        int type = (img.getTransparency() == Transparency.OPAQUE) ?
//                BufferedImage.TYPE_INT_RGB : BufferedImage.TYPE_INT_ARGB;
//        BufferedImage ret = (BufferedImage)img;
//        int w, h;
//        if (higherQuality) {
//            // Use multi-step technique: start with original size, then
//            // scale down in multiple passes with drawImage()
//            // until the target size is reached
//            w = img.getWidth();
//            h = img.getHeight();
//        } else {
//            // Use one-step technique: scale directly from original
//            // size to target size with a single drawImage() call
//            w = targetWidth;
//            h = targetHeight;
//        }
//
//        do {
//            if (higherQuality && w > targetWidth) {
//                w /= 2;
//                if (w < targetWidth) {
//                    w = targetWidth;
//                }
//            }
//
//            if (higherQuality && h > targetHeight) {
//                h /= 2;
//                if (h < targetHeight) {
//                    h = targetHeight;
//                }
//            }
//
//            BufferedImage tmp = new BufferedImage(w, h, type);
//            Graphics2D g2 = tmp.createGraphics();
//            g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
//            g2.drawImage(ret, 0, 0, w, h, null);
//            g2.dispose();
//
//            ret = tmp;
//        } while (w != targetWidth || h != targetHeight);
//
//        return ret;
    }

    private String generateStorageKey() {
        //generate the key => test if the key is already used
        String storageKey = null;

        while (storageKey == null || storedFileService.findByStoredName(storageKey) != null) {
            storageKey = KeyGenerator.generateRandomKey(100);
        }
        return storageKey;
    }
}
