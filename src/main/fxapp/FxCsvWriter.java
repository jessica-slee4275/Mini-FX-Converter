package fxapp;

import org.apache.commons.csv.*;

import java.io.FileWriter;
import java.util.Map;

public class FxCsvWriter {
    public static void writeToCsv(Map<String, Map<String, Double>> rates, String targetCurrency, String fileName) throws Exception {
        FileWriter out = new FileWriter(fileName);
        CSVPrinter printer = new CSVPrinter(out, CSVFormat.DEFAULT.withHeader("Date", "Rate"));

        for (String date : rates.keySet()) {
            Double rate = rates.get(date).get(targetCurrency);
            printer.printRecord(date, rate);
        }
        printer.flush();
        printer.close();
    }
}
