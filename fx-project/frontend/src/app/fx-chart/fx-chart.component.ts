import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { FxService } from '../fx.service';
import { FxRatesResponse } from '../fx.model';
import Chart from 'chart.js/auto';

@Component({
  standalone: true,
  selector: 'fx-chart',
  imports: [ CommonModule, FormsModule ],
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

  baseCurrency = 'USD';
  targetCurrency = 'CAD';
  amount = 100;
  convertedAmount = 0;
  currencies = ['USD', 'CAD', 'EUR', 'JPY'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
      this.fxService.getFxRates(this.baseCurrency, this.targetCurrency).subscribe(data => {
        this.rates = data;
        this.dates = Object.keys(data);
        this.rateValues = this.dates.map(d => data[d][this.targetCurrency]);

        this.todayRate = this.rateValues[this.rateValues.length - 1];
        this.convertedAmount = this.amount * this.todayRate;

        const total = this.rateValues.reduce((a, b) => a + b, 0);
        this.avgRate = total / this.rateValues.length;
        this.percentDiff = ((this.todayRate / this.avgRate) * 100) - 100;

        if (this.todayRate >= this.avgRate) {
          this.resultText =
            `🟢 It's good time to exchange! \nToday rate is ${this.todayRate.toFixed(3)} ` +
            `(average rate in last 30 days: ${this.avgRate.toFixed(3)})\n` +
            `Today rate is ${this.percentDiff.toFixed(4)}% higher than average.`;
        } else {
          this.resultText =
            `🟡 It's better to wait for exchange! \nToday rate is ${this.todayRate.toFixed(3)} ` +
            `(average rate in last 30 days: ${this.avgRate.toFixed(3)})\n` +
            `Today rate is ${Math.abs(this.percentDiff).toFixed(4)}% lower than average.`;
        }

        this.renderChart();
      });
    }
    
    chart: Chart | undefined;
    renderChart(): void {
      const canvas = document.getElementById('rateChart') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // remove previous chart
      if (this.chart) {
        this.chart.destroy();
      }

      canvas.removeAttribute('width');
      canvas.removeAttribute('height');
      // create new chart
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [{
            label: `${this.baseCurrency} to ${this.targetCurrency}`,
            data: this.rateValues,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: ctx => `Rate: ${ctx.parsed.y.toFixed(4)}`
              }
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          elements: {
            point: {
              radius: 3,
              hitRadius: 30,
              hoverRadius: 10
            }
          },
          scales: {
            x: { display: true },
            y: { display: true }
          }
        }
        
      });
    }
  }
  