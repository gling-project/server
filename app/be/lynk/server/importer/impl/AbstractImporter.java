package be.lynk.server.importer.impl;

import be.lynk.server.util.exception.MyRuntimeException;
import jxl.*;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by florian on 5/07/15.
 */
public class AbstractImporter {

    public static final String CP1252_ENCODING = "Cp1252";


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
        Z(25),
        AA(26),
        AB(27),
        AC(28),
        AD(29),
        AE(30);

        private final int value;

        Letter(int value) {
            this.value = value;
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


    protected File copyFileUsingFileStreams(File source) {
        return source;
        /*
        InputStream input = null;
        OutputStream output = null;
        try {
            File dest = File.createTempFile("temp-file-name", ".tmp");
            input = new FileInputStream(source);
            output = new FileOutputStream(dest);
            byte[] buf = new byte[1024];
            int bytesRead;
            while ((bytesRead = input.read(buf)) > 0) {
                output.write(buf, 0, bytesRead);
            }

            return dest;
        } catch (Exception e) {
            throw new MyRuntimeException(e.getMessage());
        } finally {
            try {
                input.close();
                output.close();
            } catch (IOException e) {
                throw new MyRuntimeException(e.getMessage());
            }
        }*/
    }
}
