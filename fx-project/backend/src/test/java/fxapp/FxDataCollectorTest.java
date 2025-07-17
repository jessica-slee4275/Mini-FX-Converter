package fxapp;

import org.junit.jupiter.api.Test;

import fxapp.FxDataCollector;

import static org.junit.jupiter.api.Assertions.*;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class FxDataCollectorTest {

    @Test
    public void testApiCall() throws Exception {
        FxDataCollector collector = new FxDataCollector();
        LocalDate endDate = LocalDate.now().minusDays(1);
        LocalDate startDate = endDate.minusDays(30);
        String targetCurrency = "CAD";

        Map<String, Map<String, Double>> rates = collector.getRates(
                "USD",
                "CAD",
                startDate.format(DateTimeFormatter.ISO_DATE),
                endDate.format(DateTimeFormatter.ISO_DATE)
        );

        assertNotNull(rates);
        assertTrue(rates.size() > 0, "Rates should not be empty.");
        
        System.out.println("Test Completed. Total collected the number of date: " + rates.size());
        double total_rate = 0;
        double today_rate = rates.get(endDate.format(DateTimeFormatter.ISO_DATE)).get(targetCurrency);
        for (String date : rates.keySet()) {
            Double rate = rates.get(date).get(targetCurrency);
            //System.out.println(date + ": " + rate);
            total_rate += rate;
        }
        double avg_rate = total_rate / rates.size();
        
        System.out.println("avg_rate: " + avg_rate);
        if (today_rate >= avg_rate){
            System.out.printf("It's good time to exchange! today rate is %.3f (average rate in last 30 days: %.3f)\n", today_rate, avg_rate);
            System.out.printf("Today rate is %.4f%% higher than average\n", (((today_rate/avg_rate)*100)-100));
        }else{
            System.out.printf("It's better to wait for exchange! today rate is %.3f (average rate in last 30 days: %.3f)\n", today_rate, avg_rate);
            System.out.printf("Today rate is %.4f%% lower than average\n", (((today_rate/avg_rate)*100)-100)*(-1));
        }
        
    }
}

