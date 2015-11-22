package be.lynk.server.util.httpRequest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.dto.externalDTO.FacebookPageDataDTO;
import be.lynk.server.dto.externalDTO.FacebookImageDTO;
import be.lynk.server.dto.externalDTO.FacebookPhotoDTO;
import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.model.AttendanceEnum;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.BusinessCategoryService;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.FileService;
import be.lynk.server.service.LocalizationService;
import be.lynk.server.util.constants.Constant;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.Configuration;
import play.Logger;
import play.libs.F;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.time.DayOfWeek;
import java.util.*;

/**
 * Created by florian on 3/05/15.
 */
@Component
public class FacebookRequest {

    @Autowired
    private LocalizationService     localizationService;
    @Autowired
    private BusinessCategoryService businessCategoryService;
    @Autowired
    private FileService             fileService;
    @Autowired
    private BusinessService         businessService;

    private String facebookAppId     = Configuration.root().getString("facebook.app.id");
    private String facebookAppSecret = Configuration.root().getString("facebook.app.secret");

    private static Map<String, DayOfWeek> DAY_EQUIVALENCE = new HashMap<String, DayOfWeek>() {{
        put("mon", DayOfWeek.MONDAY);
        put("tue", DayOfWeek.TUESDAY);
        put("wed", DayOfWeek.WEDNESDAY);
        put("thu", DayOfWeek.THURSDAY);
        put("fri", DayOfWeek.FRIDAY);
        put("sat", DayOfWeek.SATURDAY);
        put("sun", DayOfWeek.SUNDAY);
    }};

    private static final Integer MAX_GALLERY_IMAGE = 10;


    public FacebookTokenAccessControlDTO meRequest(String accessKey) {

        Map<String, String> map = new HashMap<>();
        map.put("access_token", accessKey);
        map.put("fields", "id,email,first_name,last_name,gender,locale");

        try {

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/v2.5/me");
            httpRequest.setReturnExcepted(FacebookTokenAccessControlDTO.class);
            httpRequest.setParams(map);
            return (FacebookTokenAccessControlDTO) httpRequest.sendRequest();
        } catch (HttpRequestException e) {
            e.printStackTrace();
            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR);
        }
    }

    public Business createBusinessFromFacebook(Account account, String facebookUrl, boolean fromBusinessRegistration) {

        if (facebookUrl.contains("/pages/")) {
            //this is not an official page
            throw new MyRuntimeException(ErrorMessageEnum.ERROR_FACEBOOK_IMPORT_NOT_OFFICIAL_PAGE);
        }


        long t = new Date().getTime();

        //call business data
        FacebookPageDataDTO pageData = getPageData(facebookUrl);

        Logger.info("T1 : " + (new Date().getTime() - t));

        //build business
        Business business = new Business();
        if (fromBusinessRegistration) {
            business.setAccount(account);
            account.setBusiness(business);
            business.setBusinessStatus(BusinessStatusEnum.NOT_PUBLISHED);
        }
        else{
            business.setBusinessStatus(BusinessStatusEnum.WAITING_CONFIRMATION);
        }
        business.setName(pageData.getName());
        business.setWebsite(pageData.getWebsite());
        business.setDescription((pageData.getDescription() != null) ? pageData.getDescription() : pageData.getAbout());
        business.setPhone(pageData.getPhone());
        if (pageData.getEmails() != null && pageData.getEmails().size() > 0) {
            business.setEmail(pageData.getEmails().get(0));
        }
        //social network
        BusinessSocialNetwork businessSocialNetwork = new BusinessSocialNetwork();
        businessSocialNetwork.setFacebookLink(pageData.getLink());
        business.setSocialNetwork(businessSocialNetwork);

        //add category
        //TODO temp
        business.setBusinessCategories(convertFacebookCategoryToBusinessCategory(pageData.getCategory()));
        //add status
        //TODO create new status ?

        //add address
        if(pageData.getLocation()!=null) {
            Address address = new Address(pageData.getLocation().getStreet(), pageData.getLocation().getZip(), pageData.getLocation().getCity(), pageData.getLocation().getCountry());

            try {
                localizationService.validAddress(address);
            } catch (Exception e) {
                e.printStackTrace();
                throw new MyRuntimeException(e.getMessage());
            }
            business.setAddress(address);
        }



        Logger.info("T2 : " + (new Date().getTime() - t));

        //landscape
        business.setLandscape(createImageFromUrl(account, pageData.getCover().getSource(), Constant.BUSINESS_LANDSCAPE_WIDTH, Constant.BUSINESS_LANDSCAPE_HEIGHT));

        Logger.info("T3 : " + (new Date().getTime() - t));

        //illustration
        business.setIllustration(createImageFromUrl(account, pageData.getPhotos(), Constant.BUSINESS_ILLUSTRATION_WIDTH, Constant.BUSINESS_ILLUSTRATION_HEIGHT));

        Logger.info("T4 : " + (new Date().getTime() - t));

        //schedule
        buildSchedule(pageData.getHours(), business);

        //save before add gallery
        businessService.saveOrUpdate(business);

        Logger.info("T5 : " + (new Date().getTime() - t));

        //gallery
//        F.Promise.promise(() -> {
        createGallery(account, pageData.getAlbums(), business);

        Logger.info("T6 : " + (new Date().getTime() - t));

        businessService.saveOrUpdate(business);

//            return null;
//        });

        Logger.info("T7 : " + (new Date().getTime() - t));

        return business;
    }

    public FacebookPageDataDTO getPageData(String pageName) {


        try {
            String accessToken = getAppAccessToken();


            String url = "https://graph.facebook.com/v2.5/" + pageName;


            //https://graph.facebook.com/v2.5/uopclibrairie?fields=description,phone,cover,link,name,location,category,emails,hours,payment_options,website,photos

            Map<String, String> map = new HashMap<>();
            map.put("fields", "description,phone,cover,link,name,location,category,emails,hours,payment_options,website,photos,albums,about");
            map.put("access_token", accessToken);

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, url);
            httpRequest.setParams(map);
            httpRequest.setReturnExcepted(FacebookPageDataDTO.class);

            return (FacebookPageDataDTO) httpRequest.sendRequest();
        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
    }

    public FacebookPhotoDTO getPhoto(String photoId) {
        String url = "https://graph.facebook.com/v2.5/" + photoId;


        try {

            String accessToken = getAppAccessToken();
            Map<String, String> map = new HashMap<>();
            map.put("fields", "photos");
            map.put("access_token", accessToken);

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, url);
            httpRequest.setParams(map);
            httpRequest.setReturnExcepted(FacebookPhotoDTO.class);

            return (FacebookPhotoDTO) httpRequest.sendRequest();

        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
    }

    public FacebookImageDTO getImage(String photoId) {
        String url = "https://graph.facebook.com/v2.5/" + photoId;


        try {

            String accessToken = getAppAccessToken();
            Map<String, String> map = new HashMap<>();
            map.put("fields", "images");
            map.put("access_token", accessToken);

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, url);
            httpRequest.setParams(map);
            httpRequest.setReturnExcepted(FacebookImageDTO.class);

            return (FacebookImageDTO) httpRequest.sendRequest();

        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
    }

    public String facebookAuthentication() {

        Map<String, String> map = new HashMap<>();
        map.put("client_id", facebookAppId);
        map.put("client_secret", facebookAppSecret);
        map.put("grant_type", "client_credentials");


        try {


            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/oauth/access_token");
            httpRequest.setParams(map);
            String response = (String) httpRequest.sendRequest();

            String token = response.split("\\|")[1].replace(" ", "");
            return token;
        } catch (HttpRequestException e) {
            e.printStackTrace();
            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR);
        }
    }

    public String getAppAccessToken() throws HttpRequestException {
        Map<String, String> params = new HashMap<>();
        params.put("client_id", facebookAppId);
        params.put("client_secret", facebookAppSecret);
        params.put("grant_type", "client_credentials");

        //recover the access token of the app
        HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/oauth/access_token");
        httpRequest.setParams(params);
        String accessTokenS = (String) httpRequest.sendRequest();

        String a = accessTokenS.split("=")[1].replace("\r", "");
        return a;

    }


    private void createGallery(Account account, FacebookPageDataDTO.Photo albums, Business business) {

        long t = new Date().getTime();

        int width = Constant.PUBLICATION_PICTURE_WIDTH;

        Logger.info("---- T1 : " + (new Date().getTime() - t));

        if (albums.getData() != null) {
            for (FacebookPageDataDTO.Photo.Data data : albums.getData()) {

                Logger.info("---- ---- T2 : " + (new Date().getTime() - t));

                //load picture
                FacebookPhotoDTO facebookPhoto = getPhoto(data.getId());

                Logger.info("---- ---- T2.1 : " + (new Date().getTime() - t));

                if (facebookPhoto.getPhotos() != null) {
                    for (FacebookPhotoDTO.Photo.Data data1 : facebookPhoto.getPhotos().getData()) {

                        Logger.info("---- ---- ---- T3 : " + (new Date().getTime() - t));

                        //load picture
                        FacebookImageDTO facebookImageDTO = getImage(data1.getId());

                        Logger.info("---- ---- ---- T3.1 : " + (new Date().getTime() - t));

                        FacebookImageDTO.Image selectedImage = null;

                        //select best picture
                        for (FacebookImageDTO.Image image : facebookImageDTO.getImages()) {
                            if (image.getWidth() > width) {
                                if (selectedImage == null || (selectedImage.getWidth() > width && image.getWidth() < selectedImage.getWidth())) {
                                    selectedImage = image;
                                }
                            } else if (selectedImage == null) {
                                selectedImage = image;
                            } else if (image.getHeight() > selectedImage.getHeight()) {
                                selectedImage = image;
                            }
                        }

                        String name = selectedImage.getSource().split("\\?")[0];

                        Logger.info("---- ---- ---- T3.2 : " + (new Date().getTime() - t));
                        File file = callImage(name, selectedImage.getSource());

                        Logger.info("---- ---- ---- T3.3 : " + (new Date().getTime() - t));

                        StoredFile storedFile = fileService.uploadWithSize(file, name, width, null, account, true);
                        storedFile.setBusinessGalleryPicture(business);
                        business.getGalleryPictures().add(storedFile);


                        Logger.info("---- ---- ---- T3.4 : " + (new Date().getTime() - t));

                        if (business.getGalleryPictures().size() >= MAX_GALLERY_IMAGE) {
                            return;
                        }
                    }
                }
            }
        }
    }

    private StoredFile createImageFromUrl(Account account, FacebookPageDataDTO.Photo photo, int width, int height) {

        if (photo.getData().size() > 0) {
            FacebookImageDTO facebookPhoto = getImage(photo.getData().get(0).getId());

            FacebookImageDTO.Image selectedImage = null;

            //select best picture
            for (FacebookImageDTO.Image image : facebookPhoto.getImages()) {
                if (image.getHeight() > height && image.getWidth() > width) {
                    selectedImage = image;
                    break;
                } else if (selectedImage == null) {
                    selectedImage = image;
                } else if (image.getHeight() > selectedImage.getHeight()) {
                    selectedImage = image;
                }
            }

            //create storedFile
            String name = selectedImage.getSource().split("\\?")[0];
            File file = callImage(name, selectedImage.getSource());
            return fileService.uploadWithSize(file, name, width, height, account, true);
        }


        return null;
    }


    private StoredFile createImageFromUrl(Account account, String urlS, int width, int height) {

        long t = new Date().getTime();

        Logger.info("-->T1 : " + (new Date().getTime() - t));

        //load image
        //convert url to image
        String name = urlS.split("\\?")[0];
        File file = callImage(name, urlS);

        Logger.info("-->T2 : " + (new Date().getTime() - t));

        StoredFile storedFile = fileService.uploadWithSize(file, name, width, height, account, true);

        Logger.info("-->T3 : " + (new Date().getTime() - t));

        return storedFile;
    }

    private File callImage(String name, String urlS) {
        URL url = null;
        try {
            url = new URL(urlS);
            URLConnection conn = url.openConnection();
            InputStream in = conn.getInputStream();
            File file = File.createTempFile(name, "png");

            FileOutputStream outputStream = new FileOutputStream(file);

            int read = 0;
            byte[] bytes = new byte[1024];

            while ((read = in.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
            return file;
        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
    }

    private void buildSchedule(Map<String, String> scheduleMap, Business business) {

        if (scheduleMap == null) {
            return;
        }

        BusinessSchedulePart businessSchedulePart = null;

        for (Map.Entry<String, String> entry : scheduleMap.entrySet()) {
            String[] split = entry.getKey().split("_");
            DayOfWeek day = DAY_EQUIVALENCE.get(split[0]);
            String action = split[2];
            Integer hour = Integer.parseInt(entry.getValue().split(":")[0]);
            if (hour == 0) {
                hour = 24;
            }
            Integer minute = Integer.parseInt(entry.getValue().split(":")[1]);
            if (minute != 0 && minute != 30) {
                minute = 0;
            }
            if (action.equals("open")) {

                //select businessSchedule
                BusinessSchedule businessSchedule = null;
                for (BusinessSchedule businessScheduleToTest : business.getSchedules()) {
                    if (businessScheduleToTest.getDayOfWeek().equals(day)) {
                        businessSchedule = businessScheduleToTest;
                    }
                }
                if (businessSchedule == null) {
                    businessSchedule = new BusinessSchedule(day, business);
                    business.getSchedules().add(businessSchedule);
                }

                //complete with part
                businessSchedulePart = new BusinessSchedulePart(hour * 60 + minute, AttendanceEnum.LIGHT, businessSchedule);
                businessSchedule.getParts().add(businessSchedulePart);

                //found close
                for (Map.Entry<String, String> entry2 : scheduleMap.entrySet()) {
                    if (entry2.getKey().equals(split[0] + "_" + split[1] + "_close")) {
                        Integer hourTo = Integer.parseInt(entry2.getValue().split(":")[0]);
                        if (hourTo == 0) {
                            hourTo = 24;
                        }
                        Integer minuteTo = Integer.parseInt(entry2.getValue().split(":")[1]);
                        businessSchedulePart.setTo(hourTo * 60 + minuteTo);
                    }
                }
            }
        }
    }

    private static Map<String, String> CATEGORY_EQUIVALENCE = new HashMap<String, String>() {{
        put("Book Store", "magasin_loisirs_livres");
        put("Library", "magasin_loisirs_livres");
        put("Camera/Photo", "magasin_loisirs_multimedia");
        put("Computers", "magasin_loisirs_multimedia");
        put("Home Decor", "magasin_loisirs_maison");
        put("Wine/Spirits", "magasin_alimentation_bieres");
        put("Jewelry/Watches", "magasin_mode_bijoux");
        put("Pet Supplies", "magasin_loisirs_animaux");
        put("Outdoor Gear/Sporting Goods", "magasin_loisirs_sport");
        put("Bank/Financial Institution", "servicesprox_findroit_banque");
        put("Legal/Law", "servicesprox_findroit_avocat");
        put("Travel/Leisure", "magasin_loisirs_voyages");
        put("Games/Toys", "magasin_loisirs_jeux");
        put("Hotel", "horeca_hotel_hotel");
        put("Food/Grocery", "magasin_alimentation_supermarche");
        put("Health/Medical/Pharmacy", "sante_autres_pharmacie");
        put("Pet Services", "magasin_loisirs_animaux");
    }};

    private List<BusinessCategory> convertFacebookCategoryToBusinessCategory(String fbCat) {
        if (CATEGORY_EQUIVALENCE.containsKey(fbCat)) {
            return Arrays.asList(businessCategoryService.findByName(CATEGORY_EQUIVALENCE.get(fbCat)));
        }
        return null;
    }
}
