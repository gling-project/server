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
import jxl.Cell;
import jxl.NumberCell;
import jxl.NumberFormulaCell;
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
    //    private static final Integer COL_PUBLICATION_DESC = 3;
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


    private void importBusiness(Sheet sheet) {
        int rowCounter = FIRST_COLUMN_INTEREST;

        while (sheet.getRows() > rowCounter) {

            Business business = new Business();
            String bName = sheet.getCell(COL_BUSINESS_NAME, rowCounter).getContents();
            business.setName(bName);
            business.setDescription(sheet.getCell(COL_BUSINESS_DESC, rowCounter).getContents());
            business.setPhone(sheet.getCell(COL_BUSINESS_PHONE, rowCounter).getContents());
            business.setBusinessStatus(BusinessStatus.PUBLISHED);
            business.setAddress(new Address(
                    sheet.getCell(COL_BUSINESS_STREET, rowCounter).getContents(),
                    sheet.getCell(COL_BUSINESS_ZIP, rowCounter).getContents(),
                    sheet.getCell(COL_BUSINESS_CITY, rowCounter).getContents(),
                    sheet.getCell(COL_BUSINESS_COUNTRY, rowCounter).getContents()
            ));
            business.setEmail(sheet.getCell(COL_BUSINESS_EMAIL, rowCounter).getContents());
            BusinessAccount account = new BusinessAccount();
            account.setFirstname(bName);
            account.setLastname(bName);
            account.setGender(GenderEnum.MALE);
            account.setEmail(sheet.getCell(COL_BUSINESS_EMAIL, rowCounter).getContents());
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

            for (String s : sheet.getCell(COL_BUSINESS_CAT, rowCounter).getContents().split("/")) {
                BusinessCategory byName = businessCategoryService.findByName(s);
                if (byName == null) {
                    Logger.warn("Cannot found the category " + s);
                } else {
                    business.getBusinessCategories().add(byName);
                }
            }

            businessService.saveOrUpdate(business);
            rowCounter++;
        }
    }

    private void importPublication(Sheet sheet) {

        int rowCounter = FIRST_COLUMN_INTEREST;
        while (sheet.getRows() > rowCounter) {


            //load business
            String businessName = sheet.getCell(COL_PUBLICATION_BUSINESS, rowCounter).getContents();
            if (businessName != null && businessName.length() > 0) {
                List<Business> businesses = businessService.findByName(businessName);
                if (businesses.size() != 1) {
                    throw new RuntimeException(businesses.size() + " business found with the name " + businessName + " (" + rowCounter + ")");
                }
                Business business = businesses.get(0);

                //type
                String type = sheet.getCell(COL_PUBLICATION_TYPE, rowCounter).getContents();

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
                    promotion.setUnit(sheet.getCell(COL_PUBLICATION_UNIT, rowCounter).getContents());
                    //compute %
                    if (promotion.getOffPercent() == null &&
                            promotion.getOriginalPrice() != null &&
                            sheet.getCell(COL_PUBLICATION_PRICE_F, rowCounter).getContents() != null) {
                        Double v = getNumber(sheet,COL_PUBLICATION_PRICE_F, rowCounter);
                        if(v!=null) {
                            promotion.setOffPercent( v / promotion.getOriginalPrice());
                        }
                    }

                } else {
                    throw new RuntimeException("Unknow type " + type);
                }

                String title = sheet.getCell(COL_PUBLICATION_TITLE, rowCounter).getContents();
                if (title != null && title.length() > 1) {
                    publication.setDescription(title);
                    publication.setBusiness(business);
                    publication.setEndDate(LocalDateTime.now().plusDays(30));
                    publication.setStartDate(LocalDateTime.now());

                    publicationService.saveOrUpdate(publication);
                }
            }
            rowCounter++;
        }
    }

    private Double getNumber(Sheet sheet, Integer colPublicationMinQ, int row) {
        Cell cell = sheet.getCell(colPublicationMinQ,row);
        try {
            NumberCell contents = (NumberCell) cell;
            return contents.getValue();
        } catch (ClassCastException | NumberFormatException e) {
            return null;
        }
    }
}
