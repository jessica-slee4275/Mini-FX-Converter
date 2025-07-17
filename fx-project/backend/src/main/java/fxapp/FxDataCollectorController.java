package fxapp;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/fx")
// http://localhost:8080/api/fx?base=USD&target=CAD
public class FxDataCollectorController {

    private final FxDataCollector fxDataCollector = new FxDataCollector();

    @GetMapping
    public Map<String, Map<String, Double>> getFxRates(
            @RequestParam String base,
            @RequestParam String target
    ) throws Exception {
        LocalDate endDate = LocalDate.now().minusDays(1);
        LocalDate startDate = endDate.minusDays(29);

        String start = startDate.format(DateTimeFormatter.ISO_DATE);
        String end = endDate.format(DateTimeFormatter.ISO_DATE);

        return fxDataCollector.getRates(base, target, start, end);
    }
}
