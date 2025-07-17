package fxapp;
/*
 * Call Frankfurter API 
 * Mapping JSON to DTO
 * Save to CSV
 */

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FxDataCollector {

    public Map<String, Map<String, Double>> getRates(
            String base,
            String target,
            String startDate,
            String endDate
    ) throws Exception {
        String url = String.format(
                "https://api.frankfurter.app/%s..%s?from=%s&to=%s",
                startDate, endDate, base, target
        );

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            String json = response.body();

            ObjectMapper mapper = new ObjectMapper();
            FxResponse fxResponse = mapper.readValue(json, FxResponse.class);

            return fxResponse.getRates();
        } else {
            throw new RuntimeException("Fail to call API: " + response.statusCode());
        }
    }
}
