# 💱 FX Converter & Rate Trend Chart

A modern and intuitive foreign exchange (FX) rate viewer and converter, styled after Wise.com.  
Built with **Angular** and **Chart.js**, this app fetches real-time exchange rate data and visualizes recent trends to help users decide the best time to convert.

---

## ✨ Features

- 📈 30-day exchange rate chart with interactive tooltips  
- 🔄 Real-time FX conversion (e.g. USD → CAD)  
- 🔎 Dynamic base and target currency selection  
- 📊 Highlight of current rate vs average rate  
- ✅ Auto-updating chart when inputs change

---

## 🛠️ Tech Stack

- Angular 17+ with Standalone Components  
- Chart.js  
- RxJS & HttpClient  
- SCSS/CSS (responsive & Wise-style)

---

## ⚙️ Setup & Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the frontend**
   ```bash
   ng serve
   ```

3. **Open your browser**  
   [http://localhost:4200](http://localhost:4200)

---

## 📡 API Backend (Expected Response)

The frontend expects a REST API like:
```
GET http://localhost:8080/api/fx?base=USD&target=CAD
```

Response format:
```ts
export interface FxRatesResponse {
  [date: string]: {
    [currency: string]: number;
  };
}
```

Example JSON:
```json
{
  "2024-06-01": { "CAD": 1.36 },
  "2024-06-02": { "CAD": 1.35 }
}
```

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── fx-chart/
│   │   ├── fx-chart.component.ts
│   │   ├── fx-chart.component.html
│   │   └── fx-chart.component.css
│   ├── fx.service.ts
│   ├── fx.model.ts
│   └── app.component.ts
└── main.ts
```

---
