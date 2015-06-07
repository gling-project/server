package be.lynk.server.importer;

import java.io.*;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.CategoryInterestLink;
import be.lynk.server.model.entities.CustomerInterest;
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
public class CategoryImporterImpl implements CategoryImporter {

    private static final Pattern PATTERN = Pattern.compile("messages\\.(.*)");
    private static final String FILE = "/home/florian/idea/project/conf/";


    private static final String CATEGORY_STREET = "Général - Catégories B. (2)";
    private static final Integer CATEGORY_FIRST_ROW = 1;
    private static final Integer FIRST_COLUMN_INTEREST = 3;

    private static final String ACCOUNTS_WORKBOOK_PATH = "file/category.xls";
    public static final String CP1252_ENCODING = "Cp1252";

    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private BusinessCategoryService businessCategoryService;
    @Autowired
    private CategoryInterestLinkService categoryInterestLinkService;

    @Override
    public String importStart() {

        //load
        Map<String, Sheet> workbookSheets = getWorkbookSheets(ACCOUNTS_WORKBOOK_PATH);

        //import category
        Sheet sheet = workbookSheets.get(CATEGORY_STREET);

        return importCategory(sheet);

    }

    private String importCategory(Sheet sheet) {

        //remove
        categoryInterestLinkService.deleteAll();
        customerInterestService.deleteAll();
        businessCategoryService.deleteAll();

        Map<Lang, Map<String, String>> translationMap = new HashMap<>();
        //TODO add lang ?
        Lang langFr = Lang.forCode("fr");
        translationMap.put(langFr, new HashMap<>());


        //build interest
        Map<Integer, CustomerInterest> interestMap = new HashMap<>();

        int column = FIRST_COLUMN_INTEREST;
        String interestS = sheet.getCell(column, 0).getContents();

        int order = 0;

        while (interestS != null && interestS.length() > 0) {

            String interestSNormalized = normalize(interestS);

            String translationKey = "--.interest." + interestSNormalized;
            translationMap.get(langFr).put(translationKey, interestS);

            CustomerInterest customerInterest = new CustomerInterest(interestSNormalized, translationKey, ++order);

            interestMap.put(column, customerInterest);

            //save
            customerInterestService.saveOrUpdate(customerInterest);

            column++;
            interestS = sheet.getCell(column, 0).getContents();
        }

        List<BusinessCategory> categories = new ArrayList<>();
        List<CategoryInterestLink> links = new ArrayList<>();

        int rowCounter = CATEGORY_FIRST_ROW;


        while (sheet.getRows() > rowCounter) {

            String catS = sheet.getCell(0, rowCounter).getContents();
            String catSNorm = normalize(catS);
            String catSTranKey = "--.category." + catSNorm;
            translationMap.get(langFr).put(catSTranKey, catS);

            String subCatS = sheet.getCell(1, rowCounter).getContents();
            String subCatSNorm = normalize(subCatS);
            String subCatSTranKey = "--.category.sub." + subCatSNorm;
            translationMap.get(langFr).put(subCatSTranKey, subCatS);

            String subSubCatS = sheet.getCell(2, rowCounter).getContents();
            String subSubCatSNorm = normalize(subSubCatS);
            String subSubCatSTranKey = "--.category.sub.sub." + subSubCatSNorm;
            translationMap.get(langFr).put(subSubCatSTranKey, subSubCatS);

            BusinessCategory cat = new BusinessCategory(catSNorm, catSTranKey, rowCounter);
            BusinessCategory subCat = new BusinessCategory(subCatSNorm, subCatSTranKey, rowCounter);
            BusinessCategory subSubCat = new BusinessCategory(subSubCatSNorm, subSubCatSTranKey, rowCounter);

            if (get(categories, cat) == null) {
                categories.add(cat);
            }
            if (get(get(categories, cat).getChildren(), subCat) == null) {
                get(categories, cat).getChildren().add(subCat);
                subCat.setParent(get(categories, cat));
            }
            get(get(categories, cat).getChildren(), subCat).getChildren().add(subSubCat);
            subSubCat.setParent(get(get(categories, cat).getChildren(), subCat));


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

        //add translation key
        try {
            writeTranslation(translationMap);
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
        return "success !";
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

    private String normalize(String s) {
        return Normalizer.normalize(s, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replaceAll("( |-)", "_")
                .replaceAll("('|&|/|\")", "");
    }

    private BusinessCategory get(List<BusinessCategory> list, BusinessCategory businessCategory) {
        for (BusinessCategory category : list) {
            if (category.getName().equals(businessCategory.getName())) {
                return category;
            }
        }
        return null;
    }

    protected static Map<String, Sheet> getWorkbookSheets(String path) {
        WorkbookSettings ws = new WorkbookSettings();
        ws.setEncoding(CP1252_ENCODING);
        ws.setSuppressWarnings(true);
        Workbook workbook = null;
        try {
            workbook = Workbook.getWorkbook(new File(path), ws);
        } catch (Exception e) {
            throw new RuntimeException("Exception while loading workbook '" + path + "'", e);
        }

        // save all sheets in a map (by workbookPath and sheetName)
        // => reduces by 80% the time of import! (huge performance leak in Workbook.getSheet(String) method)
        return getAllSheets(workbook);
    }

    private static Map<String, Sheet> getAllSheets(Workbook workbook) {
        Map<String, Sheet> workbookSheets = new HashMap<>();
        for (Sheet sheet : workbook.getSheets()) {
            workbookSheets.put(sheet.getName(), sheet);
        }
        return workbookSheets;
    }
}
