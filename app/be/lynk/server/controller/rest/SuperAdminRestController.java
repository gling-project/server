package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.admin.*;
import be.lynk.server.dto.externalDTO.FacebookPageDataDTO;
import be.lynk.server.dto.externalDTO.FacebookImageDTO;
import be.lynk.server.dto.externalDTO.FacebookPhotoDTO;
import be.lynk.server.dto.post.LoginDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.importer.CategoryImporter;
import be.lynk.server.importer.DemoImporter;
import be.lynk.server.model.AttendanceEnum;
import be.lynk.server.model.email.EmailMessage;
import be.lynk.server.model.entities.*;
import be.lynk.server.mongoService.MongoSearchService;
import be.lynk.server.service.*;
import be.lynk.server.service.impl.CustomerInterestServiceImpl;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.ContactTargetEnum;
import be.lynk.server.util.constants.Constant;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.httpRequest.FacebookRequest;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Created by florian on 5/07/15.
 */
@org.springframework.stereotype.Controller
public class SuperAdminRestController extends AbstractRestController {

    @Autowired
    private BusinessService             businessService;
    @Autowired
    private AccountService              accountService;
    @Autowired
    private LoginCredentialService      loginCredentialService;
    @Autowired
    private CategoryImporter            categoryImporter;
    @Autowired
    private DemoImporter                demoImporter;
    @Autowired
    private CustomerInterestServiceImpl customerInterestService;
    @Autowired
    private BusinessCategoryService     businessCategoryService;
    @Autowired
    private CategoryInterestLinkService categoryInterestLinkService;
    @Autowired
    private PublicationService          publicationService;
    @Autowired
    private MongoSearchService          mongoSearchService;
    @Autowired
    private EmailService                emailService;
    @Autowired
    private FacebookRequest             facebookRequest;
    @Autowired
    private LocalizationService         localizationService;
    @Autowired
    private FileService                 fileService;


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


    @Transactional
    public Result generateFakePublications() {
        Account account;
        if (!securityController.isAuthenticated(ctx())) {
            //extract DTO
            LoginDTO dto = initialization(LoginDTO.class);

            account = accountService.findByEmail(dto.getEmail());

            if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                //if there is no account for this email or the password doesn't the right, throw an exception
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }
        } else {
            account = securityController.getCurrentUser();
        }
        if (!account.getRole().equals(RoleEnum.SUPERADMIN)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        return ok(demoImporter.generateFakePublications());
    }

    @Transactional
    public Result importDemoDate() {

        Account account;
        if (!securityController.isAuthenticated(ctx())) {
            //extract DTO
            LoginDTO dto = initialization(LoginDTO.class);

            account = accountService.findByEmail(dto.getEmail());

            if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                //if there is no account for this email or the password doesn't the right, throw an exception
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }
        } else {
            account = securityController.getCurrentUser();
        }
        if (!account.getRole().equals(RoleEnum.SUPERADMIN)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        return ok(demoImporter.importStart(true));
    }

    @Transactional
    public Result importCategory() {

        Account account;
        if (!securityController.isAuthenticated(ctx())) {
            //extract DTO
            LoginDTO dto = initialization(LoginDTO.class);

            account = accountService.findByEmail(dto.getEmail());

            if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                //if there is no account for this email or the password doesn't the right, throw an exception
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }
        } else {
            account = securityController.getCurrentUser();
        }
        if (!account.getRole().equals(RoleEnum.SUPERADMIN)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        return ok(categoryImporter.importStart(true));
    }

    @Transactional
    public Result importCategoryTranslation() {

        Account account;
        if (!securityController.isAuthenticated(ctx())) {
            //extract DTO
            LoginDTO dto = initialization(LoginDTO.class);

            account = accountService.findByEmail(dto.getEmail());

            if (account == null || account.getLoginCredential() == null || !loginCredentialService.controlPassword(dto.getPassword(), account.getLoginCredential())) {
                //if there is no account for this email or the password doesn't the right, throw an exception
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_PASSWORD_OR_LOGIN);
            }
        } else {
            account = securityController.getCurrentUser();
        }
        if (!account.getRole().equals(RoleEnum.SUPERADMIN)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }


        return ok(categoryImporter.importTranslation());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result confirmPublication(Long id) {


        Business business = businessService.findById(id);

        business.setBusinessStatus(BusinessStatusEnum.PUBLISHED);

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result getCustomerPositions() {
        List<PositionDTO> customerPosition = mongoSearchService.getCustomerPosition(LocalDateTime.of(2015, 10, 1, 00, 00));

        return ok(new ListDTO<>(customerPosition));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result getInterestStats() {

        InterestStatDTO interestStatDTO = new InterestStatDTO();

        interestStatDTO.setFrom1(mongoSearchService.getInterestVisits(LocalDateTime.now().minusDays(1)));

        interestStatDTO.setFrom7(mongoSearchService.getInterestVisits(LocalDateTime.now().minusDays(7)));

        interestStatDTO.setFrom14(mongoSearchService.getInterestVisits(LocalDateTime.now().minusDays(14)));

        interestStatDTO.setFrom28(mongoSearchService.getInterestVisits(LocalDateTime.now().minusDays(28)));

        return ok(interestStatDTO);

    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result getStats() {

        AdminStatDTO adminStatDTO = new AdminStatDTO();

        Long nbCustomer = accountService.countByType(AccountTypeEnum.CUSTOMER);
        Long nbBusiness = businessService.countAll();
        Long nbTotalPublication = publicationService.countAll();
        int nbSessions = mongoSearchService.numberSessionsFrom(LocalDateTime.of(2015, 10, 10, 00, 00, 00));


        //utilisateur
        adminStatDTO.getStats().put("Nombre de compte consommateurs", new AdminStatDTO.Data(nbCustomer));

        adminStatDTO.getStats().put("Nouveaux consommateurs 1 jour", AdminStatDTO.Data.createPercent(accountService.countByTypeFrom(AccountTypeEnum.CUSTOMER, LocalDateTime.now().minusDays(1)).doubleValue(), nbCustomer.doubleValue()));

        adminStatDTO.getStats().put("Nouveaux consommateurs 7 jours", AdminStatDTO.Data.createPercent(accountService.countByTypeFrom(AccountTypeEnum.CUSTOMER, LocalDateTime.now().minusDays(7)).doubleValue(), nbCustomer.doubleValue()));

        adminStatDTO.getStats().put("Nouveaux consommateurs 28 jours", AdminStatDTO.Data.createPercent(accountService.countByTypeFrom(AccountTypeEnum.CUSTOMER, LocalDateTime.now().minusDays(28)).doubleValue(), nbCustomer.doubleValue()));

        //commerce
        adminStatDTO.getStats().put("Nombre de commerces", new AdminStatDTO.Data(nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces publiés", AdminStatDTO.Data.createPercent(businessService.countByStatus(BusinessStatusEnum.PUBLISHED), nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces ayant publié au moins une fois", AdminStatDTO.Data.createPercent(businessService.countAtLeastOnePublication(), nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces ayant au moins une publication active", AdminStatDTO.Data.createPercent(businessService.countAtLeastOneActivePublication(), nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces ayant publié au moins une fois depuis ces 7 derniers jours", AdminStatDTO.Data.createPercent(businessService.countAtLeastOnePublicationFrom(LocalDateTime.now().minusDays(7)), nbBusiness));

        adminStatDTO.getStats().put("Nombre de commerces ayant publié au moins une fois depuis ces 28 derniers jours", AdminStatDTO.Data.createPercent(businessService.countAtLeastOnePublicationFrom(LocalDateTime.now().minusDays(28)), nbBusiness));

        //publication
        adminStatDTO.getStats().put("Nombre total de publications", new AdminStatDTO.Data(nbTotalPublication));

        adminStatDTO.getStats().put("Nombre de publications actives", AdminStatDTO.Data.createPercent(publicationService.countActive(), nbTotalPublication));

        adminStatDTO.getStats().put("Nouvelles publications depuis 1 jour", AdminStatDTO.Data.createPercent(publicationService.countActiveFrom(LocalDateTime.now().minusDays(1)), nbTotalPublication));

        adminStatDTO.getStats().put("Nouvelles publications depuis 7 jour", AdminStatDTO.Data.createPercent(publicationService.countActiveFrom(LocalDateTime.now().minusDays(7)), nbTotalPublication));

        adminStatDTO.getStats().put("Nouvelles publications depuis 28 jour", AdminStatDTO.Data.createPercent(publicationService.countActiveFrom(LocalDateTime.now().minusDays(28)), nbTotalPublication));

        adminStatDTO.getStats().put("Nombre de session total", new AdminStatDTO.Data(nbSessions));

        adminStatDTO.getStats().put("Nombre de session depuis 1 jour", AdminStatDTO.Data.createPercent(mongoSearchService.numberSessionsFrom(LocalDateTime.now().minusDays(1)), nbSessions));

        adminStatDTO.getStats().put("Nombre de session depuis 7 jour", AdminStatDTO.Data.createPercent(mongoSearchService.numberSessionsFrom(LocalDateTime.now().minusDays(7)), nbSessions));

        adminStatDTO.getStats().put("Nombre de session depuis 28 jour", AdminStatDTO.Data.createPercent(mongoSearchService.numberSessionsFrom(LocalDateTime.now().minusDays(28)), nbSessions));


        return ok(adminStatDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result getCategoriesAndInterests() {

        List<BusinessCategoryWithInterestDTO> result = new ArrayList<>();
        List<BusinessCategory> all = businessCategoryService.findAll();

        for (BusinessCategory businessCategory : all) {

            BusinessCategoryWithInterestDTO dto = dozerService.map(businessCategory, BusinessCategoryWithInterestDTO.class);

            for (CategoryInterestLink categoryInterestLink : businessCategory.getLinks()) {
                CustomerInterestDTO customerInterestDTO = dozerService.map(categoryInterestLink.getCustomerInterest(), CustomerInterestDTO.class);
                dto.getInterests().add(new BusinessCategoryWithInterestDTO.InterestWithPriority(customerInterestDTO, categoryInterestLink.getPriority()));
            }

            result.add(dto);
        }

        CategoriesAndInterestsDTO categoriesAndInterestsDTO = new CategoriesAndInterestsDTO();
        categoriesAndInterestsDTO.setCategories(result);
        categoriesAndInterestsDTO.setInterests(dozerService.map(customerInterestService.findAll(), CustomerInterestDTO.class));

        return ok(categoriesAndInterestsDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result getUserDetails() {


        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();

        userDetailsDTO.setToday(getUserDetails(LocalDateTime.now().minusDays(1)));

        userDetailsDTO.setWeek(getUserDetails(LocalDateTime.now().minusDays(7)));

        userDetailsDTO.setAll(getUserDetails(null));

        return ok(userDetailsDTO);
    }

    private UserDetailsBoxDTO getUserDetails(LocalDateTime from) {
        UserDetailsBoxDTO userDetailsBoxDTO = new UserDetailsBoxDTO();

        userDetailsBoxDTO.setList(mongoSearchService.generateUserHistory(from));
        userDetailsBoxDTO.setTotal(userDetailsBoxDTO.getList().size());

        //compute session nb
        for (UserHistoryDTO userHistoryDTO : userDetailsBoxDTO.getList()) {
            if (userDetailsBoxDTO.getNbSessions().containsKey(userHistoryDTO.getNbSessions())) {
                userDetailsBoxDTO.getNbSessions().put(userHistoryDTO.getNbSessions(), userDetailsBoxDTO.getNbSessions().get(userHistoryDTO.getNbSessions()) + 1);
            } else {
                userDetailsBoxDTO.getNbSessions().put(userHistoryDTO.getNbSessions(), 1);
            }
        }

        //compute follow nb
        for (UserHistoryDTO userHistoryDTO : userDetailsBoxDTO.getList()) {
            if (userDetailsBoxDTO.getNbFollows().containsKey(userHistoryDTO.getNbFollow())) {
                userDetailsBoxDTO.getNbFollows().put(userHistoryDTO.getNbFollow(), userDetailsBoxDTO.getNbFollows().get(userHistoryDTO.getNbFollow()) + 1);
            } else {
                userDetailsBoxDTO.getNbFollows().put(userHistoryDTO.getNbFollow(), 1);
            }
        }

        //compute follow nb
        for (UserHistoryDTO userHistoryDTO : userDetailsBoxDTO.getList()) {
            if (userDetailsBoxDTO.getNbAddresses().containsKey(userHistoryDTO.getNbAddresses())) {
                userDetailsBoxDTO.getNbAddresses().put(userHistoryDTO.getNbAddresses(), userDetailsBoxDTO.getNbAddresses().get(userHistoryDTO.getNbAddresses()) + 1);
            } else {
                userDetailsBoxDTO.getNbAddresses().put(userHistoryDTO.getNbAddresses(), 1);
            }
        }

        //sharePosition
        for (UserHistoryDTO userHistoryDTO : userDetailsBoxDTO.getList()) {
            if (userDetailsBoxDTO.getSharePositions().containsKey(userHistoryDTO.getSharePosition())) {
                userDetailsBoxDTO.getSharePositions().put(userHistoryDTO.getSharePosition(), userDetailsBoxDTO.getSharePositions().get(userHistoryDTO.getSharePosition()) + 1);
            } else {
                userDetailsBoxDTO.getSharePositions().put(userHistoryDTO.getSharePosition(), 1);
            }
        }


        Collections.sort(userDetailsBoxDTO.getList());

        return userDetailsBoxDTO;
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result setCategoryInterestLink(String categoryName, String interestName, String priorityS) {

        BusinessCategory businessCategory = businessCategoryService.findByName(categoryName);

        CustomerInterest customerInterest = customerInterestService.findByName(interestName);

        if (businessCategory == null || customerInterest == null) {
            throw new MyRuntimeException("interest or category not found : " + interestName + "/" + categoryName);
        }


        for (CategoryInterestLink categoryInterestLink : businessCategory.getLinks()) {
            if (categoryInterestLink.getCustomerInterest().equals(customerInterest)) {
                if (priorityS == null) {
                    businessCategory.getLinks().remove(categoryInterestLink);
                    businessCategoryService.saveOrUpdate(businessCategory);
                    customerInterest.getLinks().remove(categoryInterestLink);
                    customerInterestService.saveOrUpdate(customerInterest);
                    categoryInterestLinkService.remove(categoryInterestLink);
                    return ok();
                } else {
                    Integer priority = Integer.parseInt(priorityS);
                    categoryInterestLink.setPriority(priority);
                    categoryInterestLinkService.saveOrUpdate(categoryInterestLink);
                    return ok();
                }

            }
        }

        if (priorityS != null) {
            CategoryInterestLink categoryInterestLink = new CategoryInterestLink(businessCategory, customerInterest, Integer.parseInt(priorityS));
            categoryInterestLinkService.saveOrUpdate(categoryInterestLink);
        }

        return ok();
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result sendEmailToBusinesses() {

        EmailDTO emailDTO = initialization(EmailDTO.class);

        List<EmailMessage.Recipient> emails = new ArrayList<>();

        emails.add(new EmailMessage.Recipient(ContactTargetEnum.NO_REPLY.getEmail(), ContactTargetEnum.NO_REPLY.name()));

        for (Business business : businessService.findAll()) {
            emails.add(new EmailMessage.Recipient(business.getEmail(), business.getName(), EmailMessage.RecipientTypeEnum.BCC));
        }

        EmailMessage emailMessage = new EmailMessage(ContactTargetEnum.HELP.getEmail(), emails, emailDTO.getSubject(), emailDTO.getMessage());

        //TODO temp change lang
        emailService.sendEmail(emailMessage, lang());

        return ok();
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result getAll() {
        List<Business> all = businessService.findAll();

        List<BusinessDTO> map = new ArrayList<>();

        for (Business business : all) {

            BusinessForAdminDTO businessDTO = dozerService.map(business, BusinessForAdminDTO.class);
            map.add(businessDTO);

            businessDTO.setTotalFollowers(followLinkService.countByBusiness(business));

            //add publication nb
            businessDTO.setNbPublication(publicationService.countByBusiness(business));
            businessDTO.setNbPublicationActive(publicationService.countActiveByBusiness(business));

        }


        return ok(new ListDTO<>(map));
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result importBusiness(String name) {

        long t = new Date().getTime();

        //call business data
        FacebookPageDataDTO pageData = facebookRequest.getPageData(name);

        Logger.info("T1 : " + (new Date().getTime() - t));

        //build business
        Business business = new Business();
        business.setName(pageData.getName());
        business.setDescription((pageData.getDescription() != null) ? pageData.getDescription() : pageData.getAbout());
        business.setPhone(pageData.getPhone());
        if (pageData.getEmails().size() > 0) {
            business.setEmail(pageData.getEmails().get(0));
        }
        //social network
        BusinessSocialNetwork businessSocialNetwork = new BusinessSocialNetwork();
        businessSocialNetwork.setFacebookLink(pageData.getLink());
        business.setSocialNetwork(businessSocialNetwork);

        //add category
        //TODO temp
        business.setBusinessCategories(Arrays.asList(businessCategoryService.findByName("eat")));
        //add status
        //TODO create new status ?
        business.setBusinessStatus(BusinessStatusEnum.PUBLISHED);

        //add address
        Address address = new Address(pageData.getLocation().getStreet(), pageData.getLocation().getZip(), pageData.getLocation().getCity(), pageData.getLocation().getCountry());

        try {
            localizationService.validAddress(address);
        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
        business.setAddress(address);

        Logger.info("T2 : " + (new Date().getTime() - t));

        //landscape
        business.setLandscape(createImageFromUrl(pageData.getCover().getSource(), Constant.BUSINESS_LANDSCAPE_WIDTH, Constant.BUSINESS_LANDSCAPE_HEIGHT));

        Logger.info("T3 : " + (new Date().getTime() - t));

        //illustration
        business.setIllustration(createImageFromUrl(pageData.getPhotos(), Constant.BUSINESS_ILLUSTRATION_WIDTH, Constant.BUSINESS_ILLUSTRATION_HEIGHT));

        Logger.info("T4 : " + (new Date().getTime() - t));

        //schedule
        buildSchedule(pageData.getHours(), business);

        //save before add gallery
        businessService.saveOrUpdate(business);

        Logger.info("T5 : " + (new Date().getTime() - t));

        //gallery
        createGallery(pageData.getAlbums(), business);

        Logger.info("T6 : " + (new Date().getTime() - t));

        businessService.saveOrUpdate(business);

        Logger.info("T7 : " + (new Date().getTime() - t));

        return ok();
    }

    private void createGallery(FacebookPageDataDTO.Photo albums, Business business) {

        long t = new Date().getTime();

        int width = Constant.PUBLICATION_PICTURE_WIDTH;

        Logger.info("---- T1 : " + (new Date().getTime() - t));

        for (FacebookPageDataDTO.Photo.Data data : albums.getData()) {

            Logger.info("---- ---- T2 : " + (new Date().getTime() - t));

            //load picture
            FacebookPhotoDTO facebookPhoto = facebookRequest.getPhoto(data.getId());

            Logger.info("---- ---- T2.1 : " + (new Date().getTime() - t));

            for (FacebookPhotoDTO.Photo.Data data1 : facebookPhoto.getPhotos().getData()) {

                Logger.info("---- ---- ---- T3 : " + (new Date().getTime() - t));

                //load picture
                FacebookImageDTO facebookImageDTO = facebookRequest.getImage(data1.getId());

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

                StoredFile storedFile = fileService.uploadWithSize(file, name, width, null, securityController.getCurrentUser(), true);
                storedFile.setBusinessGalleryPicture(business);
                business.getGalleryPictures().add(storedFile);


                Logger.info("---- ---- ---- T3.4 : " + (new Date().getTime() - t));

                if (business.getGalleryPictures().size() >= MAX_GALLERY_IMAGE) {
                    return;
                }
            }
        }
    }

    private StoredFile createImageFromUrl(FacebookPageDataDTO.Photo photo, int width, int height) {

        if (photo.getData().size() > 0) {
            FacebookImageDTO facebookPhoto = facebookRequest.getImage(photo.getData().get(0).getId());

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
            return fileService.uploadWithSize(file, name, width, height, securityController.getCurrentUser(), true);
        }


        return null;
    }

    private StoredFile createImageFromUrl(String urlS, int width, int height) {

        long t = new Date().getTime();

        Logger.info("-->T1 : " + (new Date().getTime() - t));

        //load image
        //convert url to image
        String name = urlS.split("\\?")[0];
        File file = callImage(name, urlS);

        Logger.info("-->T2 : " + (new Date().getTime() - t));

        StoredFile storedFile = fileService.uploadWithSize(file, name, width, height, securityController.getCurrentUser(), true);

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
}
