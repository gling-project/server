package be.lynk.server.importer.impl;

import java.io.*;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import be.lynk.server.importer.CategoryImporter;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.BusinessCategoryService;
import be.lynk.server.service.CategoryInterestLinkService;
import be.lynk.server.service.CustomerInterestService;
import jxl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.i18n.Lang;

/**
 * Created by florian on 5/06/15.
 */
@Component
public class CategoryImporterImpl extends AbstractImporter implements CategoryImporter {

    private static final Pattern PATTERN = Pattern.compile("messages\\.(.*)");
    private static final String FILE = "conf/";

    protected static final Integer COL_CATEGORY_CAT = 0;
    protected static final Integer COL_CATEGORY_SUB_CAT = 1;
    protected static final Integer COL_CATEGORY_SUB_SUB_CAT = 2;
    protected static final Map<Lang, Integer> COL_CATEGORY_TRANSLATION = new HashMap<Lang, Integer>() {{
        put(Lang.forCode("fr"), 20);
//        put(Lang.forCode("en"),21);
    }};
    protected static final Map<Lang, Integer> COL_INTEREST_TRANSLATION = new HashMap<Lang, Integer>() {{
        put(Lang.forCode("fr"), 1);
//        put(Lang.forCode("en"),21);
    }};

    private static final Integer COL_INTEREST_NAME = 0;
    private static final Integer COL_INTEREST_NAME_ICON = 2;

    private static final String CATEGORY_STREET = "Général - Catégories B.";
    private static final String INTEREST_SHEET = "Général - Besoins C.";
    private static final Integer CATEGORY_FIRST_ROW = 1;
    private static final Integer FIRST_COLUMN_INTEREST = 3;

    private static final String ACCOUNTS_WORKBOOK_PATH = "file/category.xls";

    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private BusinessCategoryService businessCategoryService;
    @Autowired
    private CategoryInterestLinkService categoryInterestLinkService;

    @Override
    public String importStart(boolean addTranslation) {

        //remove
        categoryInterestLinkService.deleteAll();
        customerInterestService.deleteAll();
        businessCategoryService.deleteAll();

        try {
            //load
            Map<String, Sheet> workbookSheets = getWorkbookSheets(ACCOUNTS_WORKBOOK_PATH);

            //import category
            Sheet categorySheet = workbookSheets.get(CATEGORY_STREET);
            Sheet interestSheet = workbookSheets.get(INTEREST_SHEET);

            importInterest(interestSheet, addTranslation);
            importCategory(categorySheet, addTranslation);
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }

        return "SUCCESS !!! ";
    }

    private Map<Integer, CustomerInterest> importInterest(Sheet sheet, boolean addTranslation) {

        Map<Lang, Map<String, String>> translationMap = new HashMap<>();
        //TODO add lang ?
        Lang langFr = Lang.forCode("fr");
        translationMap.put(langFr, new HashMap<>());

        //build interest
        Map<Integer, CustomerInterest> interestMap = new HashMap<>();

        int column = FIRST_COLUMN_INTEREST;
//        String interestS = sheet.getCell(column, 0).getContents();

        int order = 0;
        int rowCounter = CATEGORY_FIRST_ROW;

        while (sheet.getRows() > rowCounter) {

            String interestS = sheet.getCell(COL_INTEREST_NAME, rowCounter).getContents();
            if (interestS != null && interestS.length() > 0) {
                String interestSNormalized = normalize(interestS);

                String translationKey = "--.interest." + interestSNormalized;
                translationMap.get(langFr).put(translationKey, interestS);

                Translation translation = new Translation();
                for (Map.Entry<Lang, Integer> langIntegerEntry : COL_INTEREST_TRANSLATION.entrySet()) {
                    translation.getTranslationValues().add(new TranslationValue(translation, langIntegerEntry.getKey(), sheet.getCell(langIntegerEntry.getValue(), rowCounter).getContents()));
                }

                CustomerInterest customerInterest = new CustomerInterest(interestSNormalized, translation, ++order);
                String iconName = sheet.getCell(COL_INTEREST_NAME_ICON, rowCounter).getContents();
                if (iconName != null && iconName.length() > 0) {
                    customerInterest.setIconName(iconName);
                }

                interestMap.put(column, customerInterest);

                //save
                customerInterestService.saveOrUpdate(customerInterest);
            }
            rowCounter++;

        }
        return interestMap;
    }

    private String importCategory(Sheet sheet, boolean addTranslation) {

        int column = FIRST_COLUMN_INTEREST;
        String interestS = sheet.getCell(column, 0).getContents();
        Map<Integer, CustomerInterest> interestMap = new HashMap<>();

        int order = 0;

        while (interestS != null && interestS.length() > 0) {

            String interestSNormalized = normalize(interestS);

            CustomerInterest customerInterest = customerInterestService.findByName(interestSNormalized);

            if (customerInterest == null) {
                throw new RuntimeException("cannot found interest " + interestSNormalized);
            }
            interestMap.put(column, customerInterest);

            column++;
            interestS = sheet.getCell(column, 0).getContents();
        }


        //TODO add lang ?
        Lang langFr = Lang.forCode("fr");


        List<BusinessCategory> categories = new ArrayList<>();
        List<CategoryInterestLink> links = new ArrayList<>();

        int rowCounter = CATEGORY_FIRST_ROW;

        BusinessCategory lastCat = null;
        BusinessCategory lastSubCat = null;


        while (sheet.getRows() > rowCounter) {

            if (isNotEmpty(sheet.getCell(COL_CATEGORY_CAT, rowCounter))) {
                String catS = sheet.getCell(COL_CATEGORY_CAT, rowCounter).getContents();
                String catSNorm = normalize(catS);
                //translation
                Translation translation = new Translation();
                for (Map.Entry<Lang, Integer> langIntegerEntry : COL_CATEGORY_TRANSLATION.entrySet()) {
                    translation.getTranslationValues().add(new TranslationValue(translation, langIntegerEntry.getKey(), sheet.getCell(langIntegerEntry.getValue(), rowCounter).getContents()));
                }

                lastCat = new BusinessCategory(catSNorm, translation, rowCounter);
                categories.add(lastCat);
            } else if (isNotEmpty(sheet.getCell(COL_CATEGORY_SUB_CAT, rowCounter))) {
                String catS = sheet.getCell(COL_CATEGORY_SUB_CAT, rowCounter).getContents();
                String catSNorm = normalize(catS);
                //translation
                Translation translation = new Translation();
                for (Map.Entry<Lang, Integer> langIntegerEntry : COL_CATEGORY_TRANSLATION.entrySet()) {
                    translation.getTranslationValues().add(new TranslationValue(translation, langIntegerEntry.getKey(), sheet.getCell(langIntegerEntry.getValue(), rowCounter).getContents()));
                }

                lastSubCat = new BusinessCategory(lastCat, catSNorm, translation, rowCounter);
                categories.add(lastSubCat);

            } else if (isNotEmpty(sheet.getCell(COL_CATEGORY_SUB_SUB_CAT, rowCounter))) {
                String catS = sheet.getCell(COL_CATEGORY_SUB_SUB_CAT, rowCounter).getContents();
                String catSNorm = normalize(catS);
                //translation
                Translation translation = new Translation();
                for (Map.Entry<Lang, Integer> langIntegerEntry : COL_CATEGORY_TRANSLATION.entrySet()) {
                    translation.getTranslationValues().add(new TranslationValue(translation, langIntegerEntry.getKey(), sheet.getCell(langIntegerEntry.getValue(), rowCounter).getContents()));
                }
                BusinessCategory subSubCat = new BusinessCategory(lastSubCat, catSNorm, translation, rowCounter);
                categories.add(subSubCat);
                //test category
                for (int col = FIRST_COLUMN_INTEREST; col < FIRST_COLUMN_INTEREST + interestMap.size(); col++) {
                    String value = sheet.getCell(col, rowCounter).getContents();
                    CustomerInterest interest = interestMap.get(col);
                    if (value != null && value.length() > 0) {
                        int valueNum = Integer.parseInt(value);
                        //build lik
                        CategoryInterestLink link = new CategoryInterestLink(subSubCat, interest, valueNum);
                        links.add(link);


                    }
                }
            }

            //END
            rowCounter++;
        }

        for (BusinessCategory category : categories) {
            //save
            businessCategoryService.saveOrUpdate(category);
        }

        for (CategoryInterestLink link : links) {
            //save
            categoryInterestLinkService.saveOrUpdate(link);
        }

//        //add translation key
//        if (addTranslation) {
//            try {
//                writeTranslation(translationMap);
//            } catch (Exception e) {
//                e.printStackTrace();
//                return e.getMessage();
//            }
//        }
        return "success !";
    }

    private boolean isNotEmpty(Cell cell) {
        return cell.getContents() != null && cell.getContents().length() > 0;
    }

    private void writeTranslation(Map<Lang, Map<String, String>> translationMap) throws Exception {

        //load translation file
        File file = new File(FILE);

        if (file.isDirectory()) {
            for (File file1 : file.listFiles()) {
                Matcher matcher = PATTERN.matcher(file1.getName());
                if (matcher.find()) {

                    Lang lang = Lang.forCode(matcher.group(1));
                    Map<String, String> translation = translationMap.get(lang);
                    if (translation != null) {
                        //add
                        completeFile(file1, translation);
                        //comment deleted key
                    }

                    //savef
                }
            }

        } else {
            throw new Exception(FILE + " is not a directory");
        }

//        String toWrite = "";
//        for (Map.Entry<String, String> langMapEntry : translationMap.get(langFr).entrySet()) {
//            toWrite += langMapEntry.getKey() + "=" + langMapEntry.getValue() + "\n";
//        }
//
//
//        try {
//            FileOutputStream out = new FileOutputStream("/tmp/properties_translations.properties");
//            out.write(toWrite.getBytes());
//            out.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }


        //TODO 1) load properties
        //TODO 2) remove existents keys
        //TODO 3) add new keys
    }

    private void completeFile(File file, Map<String, String> translationMap) throws Exception {

        String content = getString(file);


        Pattern pattern = Pattern.compile("(\\n|^)((#)? *((--\\.category\\.|--\\.interest\\.).*))=(.+)");

        Matcher matcher = pattern.matcher(content);

        while (matcher.find()) {

            content = content.replace(matcher.group(), "");
        }


        for (Map.Entry<String, String> langMapEntry : translationMap.entrySet()) {
            content += langMapEntry.getKey() + "=" + langMapEntry.getValue() + "\n";
        }


        save(content + "\n\n", "/tmp/" + file.getName(), true);


    }

    public static String getString(File file) throws Exception {
        BufferedReader br = new BufferedReader(new FileReader(file));
        try {
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();

            while (line != null) {
                sb.append(line);
                sb.append(System.lineSeparator());
                line = br.readLine();
            }
            return sb.toString();
        } finally {
            br.close();
        }
    }

    public static void save(final String content, final String path, boolean erase) {

        final File file = new File(path);

        if (!file.exists() || erase == true) {

            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }
            try {
                file.createNewFile();
                System.out.println("saved !");
            } catch (final IOException e) {
                System.out.println("file no created");
            }

            file.setWritable(true);
            file.setReadable(true);
            try {
                //final PrintWriter out = new PrintWriter(new FileWriter(nameFile), true);
                Writer out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), "UTF-8"));

                out.write(content);

                out.close();
            } catch (final Exception e) {
                e.printStackTrace();
            }
        } else
            System.out.println("file already exist and can't be erase");

    }

    protected BusinessCategory get(List<BusinessCategory> list, BusinessCategory businessCategory) {
        for (BusinessCategory category : list) {
            if (category.getName().equals(businessCategory.getName())) {
                return category;
            }
        }
        return null;
    }


}
