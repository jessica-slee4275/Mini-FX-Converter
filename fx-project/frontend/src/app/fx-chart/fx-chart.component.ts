import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FxService } from '../fx.service';
import { FxRatesResponse } from '../fx.model';

@Component({
  standalone: true,
  selector: 'fx-chart',
  imports: [CommonModule],
  //template: '<h1 style="color:red">✅ fx chart loaded!</h1>',
  templateUrl: './fx-chart.component.html',
  styleUrls: ['./fx-chart.component.css']
})
export class FxChartComponent implements OnInit {
  rates: FxRatesResponse = {};
  dates: string[] = [];
  rateValues: number[] = [];
  avgRate = 0;
  todayRate = 0;
  percentDiff = 0;
  resultText = '';

  constructor(private fxService: FxService) { }

  ngOnInit(): void {
    this.fxService.getFxRates('USD', 'CAD').subscribe((data: FxRatesResponse) => {
      this.rates = data;
      this.dates = Object.keys(this.rates);
      this.rateValues = this.dates.map(d => this.rates[d]['CAD']);

      this.todayRate = this.rateValues[this.rateValues.length - 1];
      const totalRate = this.rateValues.reduce((sum, val) => sum + val, 0);
      this.avgRate = totalRate / this.rateValues.length;

      this.percentDiff = ((this.todayRate / this.avgRate) * 100) - 100;

      if (this.todayRate >= this.avgRate) {
        this.resultText =
          `It's good time to exchange! today rate is ${this.todayRate.toFixed(3)} ` +
          `(average rate in last 30 days: ${this.avgRate.toFixed(3)})\n` +
          `Today rate is ${this.percentDiff.toFixed(4)}% higher than average.`;
      } else {
        this.resultText =
          `It's better to wait for exchange! today rate is ${this.todayRate.toFixed(3)} ` +
          `(average rate in last 30 days: ${this.avgRate.toFixed(3)})\n` +
          `Today rate is ${Math.abs(this.percentDiff).toFixed(4)}% lower than average.`;
      }
    });
  }
}
