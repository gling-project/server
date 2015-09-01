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
        A(0),
        B(1),
        C(2),
        D(3),
        E(4),
        F(5),
        G(6),
        H(7),
        I(8),
        J(9),
        K(10),
        L(11),
        M(12),
        N(13),
        O(14),
        P(15),
        Q(16),
        R(17),
        S(18),
        T(19),
        U(20),
        V(21),
        W(22),
        X(23),
        Y(24),
        Z(25);

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
