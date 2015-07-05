package be.lynk.server.importer.impl;

import be.lynk.server.model.entities.BusinessCategory;
import jxl.Sheet;
import jxl.Workbook;
import jxl.WorkbookSettings;

import java.io.File;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 5/07/15.
 */
public class AbstractImporter {

    public static final String CP1252_ENCODING = "Cp1252";


    protected String normalize(String s) {
        return Normalizer.normalize(s, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replaceAll("( |-)", "_")
                .replaceAll("('|&|/|\")", "");
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

    protected static Map<String, Sheet> getAllSheets(Workbook workbook) {
        Map<String, Sheet> workbookSheets = new HashMap<>();
        for (Sheet sheet : workbook.getSheets()) {
            workbookSheets.put(sheet.getName(), sheet);
        }
        return workbookSheets;
    }
}
