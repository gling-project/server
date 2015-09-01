package be.lynk.server.importer.impl;

import jxl.*;

import java.io.File;
import java.text.Normalizer;
import java.util.HashMap;
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

    protected enum Letter {
        A(1),
        B(2),
        C(3),
        D(4),
        E(5),
        F(6),
        G(7),
        H(8),
        I(9),
        J(10),
        K(11),
        L(12),
        M(13),
        N(14),
        O(15),
        P(16),
        Q(17),
        R(18),
        S(19),
        T(20),
        U(21),
        V(22),
        W(23),
        X(24),
        Y(25),
        Z(26);

        private final int value;

        Letter(int value) {
            this.value = value - 1;
        }

        public int getValue() {
            return value;
        }
    }

    protected String getString(Sheet sheet, Letter col, int row) {
        return sheet.getCell(col.getValue(), row).getContents();
    }

    protected Cell getCell(Sheet sheet, Letter col, int row) {
        return sheet.getCell(col.getValue(), row);
    }

    protected Double getNumber(Sheet sheet, Letter colPublicationMinQ, int row) {
        Cell cell = sheet.getCell(colPublicationMinQ.getValue(), row);
        try {
            NumberCell contents = (NumberCell) cell;
            return contents.getValue();
        } catch (ClassCastException | NumberFormatException e) {
            String contents = cell.getContents();
            try {
                return Double.parseDouble(contents);
            } catch (NumberFormatException e1) {
                return null;
            }
        }
    }
}
