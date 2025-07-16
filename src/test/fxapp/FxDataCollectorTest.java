package fxapp;

import org.junit.jupiter.api.Test;

import fxapp.FxDataCollector;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

public class FxDataCollectorTest {

    @Test
    public void testApiCall() throws Exception {
        FxDataCollector collector = new FxDataCollector();
        Map<String, Map<String, Double>> rates = collector.getRates(
                "USD",
                "CAD",
                "2024-06-01",
                "2024-07-10"
        );

        assertNotNull(rates);
        assertTrue(rates.size() > 0, "Rates should not be empty.");

        System.out.println("Test Completed. Total collected the number of date: " + rates.size());
    }
}

