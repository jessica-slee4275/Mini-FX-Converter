import { Component } from '@angular/core';
import { FxChartComponent } from './fx-chart/fx-chart.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ FxChartComponent ]  
})
export class AppComponent {
  title = 'FxProject';
}
