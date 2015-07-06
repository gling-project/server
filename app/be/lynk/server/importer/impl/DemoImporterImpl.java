package be.lynk.server.importer.impl;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.importer.DemoImporter;
import be.lynk.server.model.GenderEnum;
import be.lynk.server.model.entities.*;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.publication.BusinessNotification;
import be.lynk.server.model.entities.publication.Promotion;
import be.lynk.server.service.BusinessCategoryService;
import be.lynk.server.service.BusinessService;
import be.lynk.server.service.LocalizationService;
import be.lynk.server.service.PublicationService;
import be.lynk.server.util.AccountTypeEnum;
import jxl.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.Logger;
import play.i18n.Lang;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 5/07/15.
 */
@Component
public class DemoImporterImpl extends AbstractImporter implements DemoImporter {

    private static final String ACCOUNTS_WORKBOOK_PATH = "file/demo_data.xls";
    private static final String BUSINESS_SHEET = "Commerces";
    private static final String PUBLICATION_SHEET = "Publications";

    /**
     * BUSINESS COLUMNS *
     */
    private static final Integer COL_BUSINESS_NAME = 0;
    private static final Integer COL_BUSINESS_DESC = 1;
    private static final Integer COL_BUSINESS_PHONE = 2;
    private static final Integer COL_BUSINESS_STREET = 3;
    private static final Integer COL_BUSINESS_CITY = 4;
    private static final Integer COL_BUSINESS_ZIP = 5;
    private static final Integer COL_BUSINESS_COUNTRY = 6;

    private static final Integer COL_BUSINESS_CAT = 14;
    private static final Integer COL_BUSINESS_EMAIL = 15;
    private static final int FIRST_COLUMN_INTEREST = 1;

    /**
     * BUSINESS COLUMNS *
     */
    private static final Integer COL_PUBLICATION_BUSINESS = 0;
    private static final Integer COL_PUBLICATION_TYPE = 1;
    private static final Integer COL_PUBLICATION_TITLE = 2;
    private static final Integer COL_PUBLICATION_DESC = 3;
    private static final Integer COL_PUBLICATION_Q = 7;
    private static final Integer COL_PUBLICATION_MIN_Q = 8;
    private static final Integer COL_PUBLICATION_UNIT = 9;
    private static final Integer COL_PUBLICATION_PRICE_O = 10;
    private static final Integer COL_PUBLICATION_PERCENT = 11;
    private static final Integer COL_PUBLICATION_PRICE_F = 12;

    @Autowired
    private BusinessCategoryService businessCategoryService;
    @Autowired
    private BusinessService businessService;
    @Autowired
    private LocalizationService localizationService;
    @Autowired
    private PublicationService publicationService;

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

    private void importPublication(Sheet sheet) {
        int column = FIRST_COLUMN_INTEREST;
        String row = sheet.getCell(column, 0).getContents();

        int order = 0;

        while (row != null && row.length() > 0) {


            //load business
            String businessName = sheet.getCell(COL_PUBLICATION_BUSINESS, column).getContents();
            List<Business> businesses = businessService.findByName(businessName);
            if (businesses.size() != 1) {
                throw new RuntimeException(businesses.size() + " business found with the name " + businessName);
            }
            Business business = businesses.get(0);

            //type
            String type = sheet.getCell(COL_PUBLICATION_TYPE, column).getContents();

            AbstractPublication publication;

            if (type.equals("Actualité")) {
                publication = new BusinessNotification();
            } else if (type.equals("Promo Complexe") ||
                    type.equals("Promo Simple")) {
                publication = new Promotion();
                Promotion promotion = (Promotion) publication;

                promotion.setMinimalQuantity(getNumber(sheet, COL_PUBLICATION_MIN_Q, column));
                promotion.setQuantity(getNumber(sheet, COL_PUBLICATION_Q, column));
                Double number = getNumber(sheet, COL_PUBLICATION_PERCENT, column);
                if (number != null) {
                    promotion.setOffPercent(number / 100);
                }
                promotion.setOriginalPrice(getNumber(sheet, COL_PUBLICATION_PRICE_O, column));
                promotion.setUnit(sheet.getCell(COL_PUBLICATION_UNIT, column).getContents());
                //compute %
                if (promotion.getOffPercent() == null &&
                        promotion.getOriginalPrice() != null &&
                        sheet.getCell(COL_PUBLICATION_PRICE_F, column).getContents() != null) {
                    double v = Double.parseDouble(sheet.getCell(COL_PUBLICATION_PRICE_F, column).getContents());
                    promotion.setOffPercent(promotion.getOriginalPrice() / v);
                }

            } else {
                throw new RuntimeException("Unknow type " + type);
            }

            publication.setDescription(sheet.getCell(COL_PUBLICATION_DESC, column).getContents());
            publication.setBusiness(business);
            publication.setEndDate(LocalDateTime.now().plusDays(30));
            publication.setStartDate(LocalDateTime.now());


            publicationService.saveOrUpdate(publication);

            column++;
            row = sheet.getCell(column, 0).getContents();
        }
    }

    private Double getNumber(Sheet sheet, Integer colPublicationMinQ, int column) {
        String contents = sheet.getCell(colPublicationMinQ, column).getContents();
        try {
            return Double.parseDouble(contents);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private void importBusiness(Sheet sheet) {
        int column = FIRST_COLUMN_INTEREST;
        String row = sheet.getCell(column, 0).getContents();

        int order = 0;

        while (row != null && row.length() > 0) {
            Business business = new Business();
            String bName = sheet.getCell(COL_BUSINESS_NAME, column).getContents();
            business.setName(bName);
            business.setDescription(sheet.getCell(COL_BUSINESS_DESC, column).getContents());
            business.setPhone(sheet.getCell(COL_BUSINESS_PHONE, column).getContents());
            business.setBusinessStatus(BusinessStatus.PUBLISHED);
            business.setAddress(new Address(
                    sheet.getCell(COL_BUSINESS_STREET, column).getContents(),
                    sheet.getCell(COL_BUSINESS_ZIP, column).getContents(),
                    sheet.getCell(COL_BUSINESS_CITY, column).getContents(),
                    sheet.getCell(COL_BUSINESS_COUNTRY, column).getContents()
            ));
            business.setEmail(sheet.getCell(COL_BUSINESS_EMAIL, column).getContents());
            BusinessAccount account = new BusinessAccount();
            account.setFirstname(bName);
            account.setLastname(bName);
            account.setGender(GenderEnum.MALE);
            account.setEmail(sheet.getCell(COL_BUSINESS_EMAIL, column).getContents());
            account.setLoginCredential(new LoginCredential(account, false, "password"));
            account.setBusiness(business);
            account.setRole(RoleEnum.BUSINESS);
            account.setType(AccountTypeEnum.BUSINESS);
            account.setLang(Lang.forCode("fr"));

            business.setAccount(account);

            try {
                localizationService.validAddress(business.getAddress());
            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }

            for (String s : sheet.getCell(COL_BUSINESS_CAT, column).getContents().split("/")) {
                BusinessCategory byName = businessCategoryService.findByName(s);
                if (byName == null) {
                    Logger.warn("Cannot found the category " + s);
                } else {
                    business.getBusinessCategories().add(byName);
                }
            }

            businessService.saveOrUpdate(business);
            column++;
            row = sheet.getCell(column, 0).getContents();
        }
    }
}
