package be.lynk.server.importer.impl;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.importer.DemoImporter;
import be.lynk.server.model.GenderEnum;
import be.lynk.server.model.entities.*;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.BusinessNotification;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.*;
import be.lynk.server.util.AccountTypeEnum;
import be.lynk.server.util.StringUtil;
import be.lynk.server.util.constants.Constant;
import jxl.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.Logger;
import play.i18n.Lang;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 5/07/15.
 */
@Component
public class DemoImporterImpl extends AbstractImporter implements DemoImporter {

    private static final String ACCOUNTS_WORKBOOK_PATH = "file/demo_data.xls";
    private static final String BUSINESS_SHEET         = "Commerces";
    private static final String PUBLICATION_SHEET      = "Publications";

    /**
     * BUSINESS COLUMNS *
     */
    private static final Boolean WITH_PICTURE         = true;
    private static final Letter  COL_BUSINESS_NAME    = Letter.A;
    private static final Letter  COL_BUSINESS_DESC    = Letter.B;
    private static final Letter  COL_BUSINESS_PHONE   = Letter.C;
    private static final Letter  COL_BUSINESS_STREET  = Letter.D;
    private static final Letter  COL_BUSINESS_CITY    = Letter.E;
    private static final Letter  COL_BUSINESS_ZIP     = Letter.F;
    private static final Letter  COL_BUSINESS_COUNTRY = Letter.G;

    private static final Letter COL_BUSINESS_LANDSCAPE = Letter.J;
    private static final Letter COL_BUSINESS_LOGO      = Letter.K;
    private static final Letter COL_BUSINESS_CAT       = Letter.O;
    private static final Letter COL_BUSINESS_EMAIL     = Letter.P;
    private static final int    FIRST_COLUMN_INTEREST  = 1;

    /**
     * PUBLICATION COLUMNS *
     */
    private static final Letter COL_PUBLICATION_BUSINESS   = Letter.A;
    private static final Letter COL_PUBLICATION_TYPE       = Letter.B;
    private static final Letter COL_PUBLICATION_TITLE      = Letter.C;
    private static final Letter COL_PUBLICATION_DESC       = Letter.D;
    private static final Letter COL_PUBLICATION_START_HOUR = Letter.E;
    private static final Letter COL_PUBLICATION_END_HOUR   = Letter.F;
    private static final Letter COL_PUBLICATION_PICTURES   = Letter.G;
    private static final Letter COL_PUBLICATION_Q          = Letter.H;
    private static final Letter COL_PUBLICATION_MIN_Q      = Letter.I;
    private static final Letter COL_PUBLICATION_UNIT       = Letter.J;
    private static final Letter COL_PUBLICATION_PRICE_O    = Letter.K;
    private static final Letter COL_PUBLICATION_PERCENT    = Letter.L;
    private static final Letter COL_PUBLICATION_PRICE_F    = Letter.M;
    private static final Letter COL_PUBLICATION_INTEREST   = Letter.N;

    @Autowired
    private BusinessCategoryService businessCategoryService;
    @Autowired
    private BusinessService         businessService;
    @Autowired
    private LocalizationService     localizationService;
    @Autowired
    private PublicationService      publicationService;
    @Autowired
    private StoredFileService       storedFileService;
    @Autowired
    private FileService             fileService;
    @Autowired
    private CustomerInterestService customerInterestService;

    @Override
    public String importStart(boolean b) {

        //load
        Map<String, Sheet> workbookSheets = getWorkbookSheets(ACCOUNTS_WORKBOOK_PATH);

        //import category
        Sheet sheet = workbookSheets.get(BUSINESS_SHEET);
        Sheet sheetPublication = workbookSheets.get(PUBLICATION_SHEET);

        importBusiness(sheet);

        importPublication(sheetPublication);

        return "success";
    }


    private void importBusiness(Sheet sheet) {
        int rowCounter = FIRST_COLUMN_INTEREST;

        while (sheet.getRows() > rowCounter) {
            String bName = getString(sheet, COL_BUSINESS_NAME, rowCounter);

            if (bName != null && bName.length() > 0) {

                Business business = new Business();
                business.setName(bName);
//                business.setDescription(getString(sheet, COL_BUSINESS_DESC, rowCounter));
                business.setPhone(getString(sheet, COL_BUSINESS_PHONE, rowCounter));
                business.setBusinessStatus(BusinessStatusEnum.PUBLISHED);
                business.setAddress(new Address(
                        getString(sheet, COL_BUSINESS_STREET, rowCounter),
                        getString(sheet, COL_BUSINESS_ZIP, rowCounter),
                        getString(sheet, COL_BUSINESS_CITY, rowCounter),
                        getString(sheet, COL_BUSINESS_COUNTRY, rowCounter)
                ));
                business.setEmail(getString(sheet, COL_BUSINESS_EMAIL, rowCounter));
                BusinessAccount account = new BusinessAccount();
                account.setFirstname(bName);
                account.setLastname(bName);
                account.setGender(GenderEnum.MALE);
                account.setEmail(getString(sheet, COL_BUSINESS_EMAIL, rowCounter));
                account.setLoginCredential(new LoginCredential(account, false, "password"));
                account.setBusiness(business);
                account.setRole(RoleEnum.BUSINESS);
                account.setType(AccountTypeEnum.BUSINESS);
                account.setLang(Lang.forCode("fr"));

                business.setAccount(account);

                try {
                    localizationService.validAddress(business.getAddress());
                } catch (Exception e) {
                    throw new RuntimeException(e.getMessage() + "for address : " + business.getAddress());
                }


//            for (String s : getString(sheet,COL_BUSINESS_CAT, rowCounter).split("/")) {
                String s = getString(sheet, COL_BUSINESS_CAT, rowCounter);
                BusinessCategory byName = businessCategoryService.findByName(StringUtil.normalize(s));
                if (byName == null) {
                    Logger.warn("Cannot found the category " + s);
                } else {
                    business.getBusinessCategories().add(byName);
                }
//            }
                try {
                    businessService.saveOrUpdate(business);
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new RuntimeException(e);
                }


                if (WITH_PICTURE) {
                    String landscapePath = getString(sheet, COL_BUSINESS_LANDSCAPE, rowCounter);
                    if (landscapePath != null && landscapePath.length() > 0) {
                        String path = "file/images/commerces/" + landscapePath;
                        File file = copyFileUsingFileStreams(new File(path));
                        if (file != null) {
                            //landscape
                            try {
                                business.setLandscape(fileService.uploadWithSize(file, file.getName(), Constant.BUSINESS_LANDSCAPE_WIDTH, Constant.BUSINESS_LANDSCAPE_HEIGHT, account));
//                                business.setLandscape(fileService.uploadWithSize(file,file.getName(), account));
                            } catch (Throwable e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }

                //illustration
                if (WITH_PICTURE) {
                    String illustrationPath = getString(sheet, COL_BUSINESS_LOGO, rowCounter);
                    if (illustrationPath != null && illustrationPath.length() > 0) {
                        String path = "file/images/commerces/" + illustrationPath;
                        File file = copyFileUsingFileStreams(new File(path));
                        if (file != null) {
                            try {
                                business.setIllustration(fileService.uploadWithSize(file, file.getName(), Constant.BUSINESS_ILLUSTRATION_WIDTH, Constant.BUSINESS_ILLUSTRATION_HEIGHT, account));
                            } catch (Throwable e) {

                                e.printStackTrace();
                            }
                        }

                    }
                }


                businessService.saveOrUpdate(business);
            }


            rowCounter++;
        }
    }

    private void importPublication(Sheet sheet) {

        int rowCounter = FIRST_COLUMN_INTEREST;
        while (sheet.getRows() > rowCounter) {


            //load business
            String businessName = getString(sheet, COL_PUBLICATION_BUSINESS, rowCounter);
            if (businessName != null && businessName.length() > 0) {
                List<Business> businesses = businessService.findByName(businessName);
                if (businesses.size() != 1) {
                    throw new RuntimeException(businesses.size() + " business found with the name " + businessName + " (" + rowCounter + ")");
                }
                Business business = businesses.get(0);

                //type
                String type = getString(sheet, COL_PUBLICATION_TYPE, rowCounter);

                AbstractPublication publication;

                if (type.equals("Actualité")) {
                    publication = new BusinessNotification();
                } else if (type.equals("Promo Complexe") ||
                        type.equals("Promo Simple")) {
                    publication = new Promotion();
                    Promotion promotion = (Promotion) publication;

                    promotion.setMinimalQuantity(getNumber(sheet, COL_PUBLICATION_MIN_Q, rowCounter));
                    promotion.setQuantity(getNumber(sheet, COL_PUBLICATION_Q, rowCounter));
                    Double number = getNumber(sheet, COL_PUBLICATION_PERCENT, rowCounter);
                    if (number != null) {
                        promotion.setOffPercent(number);
                    }
                    promotion.setOriginalPrice(getNumber(sheet, COL_PUBLICATION_PRICE_O, rowCounter));
                    promotion.setUnit(getString(sheet, COL_PUBLICATION_UNIT, rowCounter));
                    //compute %
                    if (promotion.getOffPercent() == null &&
                            promotion.getOriginalPrice() != null &&
                            getString(sheet, COL_PUBLICATION_PRICE_F, rowCounter) != null) {
                        Double v = getNumber(sheet, COL_PUBLICATION_PRICE_F, rowCounter);
                        if (v != null) {
                            promotion.setOffPercent(v / promotion.getOriginalPrice());
                        }
                    }

                } else {
                    throw new RuntimeException("Unknow type " + type);
                }

                String title = getString(sheet, COL_PUBLICATION_TITLE, rowCounter);
                String desc = getString(sheet, COL_PUBLICATION_DESC, rowCounter);

                //interest
                String interestS = getString(sheet, COL_PUBLICATION_INTEREST, rowCounter);
                if (interestS != null && interestS.length() > 0) {
                    // loading interest
                    interestS = StringUtil.normalize(interestS);
                    CustomerInterest interest = customerInterestService.findByName(interestS);
                    if (interest == null) {
                        throw new RuntimeException("cannot found interest " + interestS);
                    }
                    publication.setInterest(interest);
                }


                if (title != null && title.length() >= 2 && title.length() <= 100) {
                    publication.setTitle(title);
                    publication.setDescription(desc);
                    publication.setBusiness(business);
                    try {
                        publication.setEndDate(LocalDateTime.now().plusHours(getNumber(sheet, COL_PUBLICATION_END_HOUR, rowCounter).longValue()));
                        publication.setStartDate(LocalDateTime.now().minusHours(getNumber(sheet, COL_PUBLICATION_START_HOUR, rowCounter).longValue()));
                    } catch (Exception e) {
                        publication.setEndDate(LocalDateTime.now());
                        publication.setStartDate(LocalDateTime.now().plusDays(30));
                    }

                    publicationService.saveOrUpdate(publication);


                    //illustration
                    if (WITH_PICTURE) {
                        try {
                            String illustrationPath = getString(sheet, COL_PUBLICATION_PICTURES, rowCounter);
                            if (illustrationPath != null && illustrationPath.length() > 0) {
                                for (String s : illustrationPath.split(";")) {
                                    String path = "file/images/publications/" + s;
                                    File file = copyFileUsingFileStreams(new File(path));
                                    if (file != null) {
                                        StoredFile storedFile = fileService.uploadWithSize(file, file.getName(), Constant.PUBLICATION_PICTURE_WIDTH, Constant.PUBLICATION_PICTURE_HEIGHT, business.getAccount());
                                        storedFile.setPublication(publication);
                                        publication.getPictures().add(storedFile);
                                        storedFileService.saveOrUpdate(storedFile);
                                    }
                                }
                            }
                        } catch (Throwable e) {
                        }
                    }

                }
            }
            rowCounter++;
        }
    }

    public String generateFakePublications() {

        for (int i = 0; i < 1000; i++) {

            //account
            Business business = new Business();
            business.setName("business " + i);
            ;
            business.setDescription("business " + i + " - escription");
            business.setPhone("00000000");
            business.setBusinessStatus(BusinessStatusEnum.PUBLISHED);
            business.setAddress(new Address("4 Place des Bienfaiteurs", "1030", "BXL", "BELGIUM"));
            business.getAddress().setPosx(50.8357006);
            business.getAddress().setPosy(4.4397416);
            business.getBusinessCategories().add(businessCategoryService.findByName("servicespubliques_communal_urbanisme"));
            business.setEmail("bus" + i + "@aze.com");
            BusinessAccount account = new BusinessAccount();
            account.setFirstname("bus" + i + "firstName");
            account.setLastname("bus" + i + "LastName");
            account.setGender(GenderEnum.MALE);
            account.setEmail("bus" + i + "@aze.com");
            account.setLoginCredential(new LoginCredential(account, false, "password"));
            account.setBusiness(business);
            account.setRole(RoleEnum.BUSINESS);
            account.setType(AccountTypeEnum.BUSINESS);
            account.setLang(Lang.forCode("fr"));

            business.setAccount(account);

            businessService.saveOrUpdate(business);


            //publication
            BusinessNotification p = new BusinessNotification();
            p.setBusiness(business);
            p.setStartDate(LocalDateTime.now().minusDays(1).plusMinutes(i));
            p.setDescription("descr");
            p.setTitle("title " + i);
            p.setEndDate(LocalDateTime.now().plusDays(4).plusMinutes(i));

            publicationService.saveOrUpdate(p);
        }

        return "success";
    }
}
