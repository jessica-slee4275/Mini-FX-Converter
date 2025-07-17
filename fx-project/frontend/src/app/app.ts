import { Component } from '@angular/core';
import { FxChartComponent } from './fx-chart/fx-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FxChartComponent],
  template: `
    <h1>FxProject</h1>
    <fx-chart></fx-chart>
  `
})
export class App { }
