import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FxChartComponent } from './fx-chart/fx-chart.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ FxChartComponent, FormsModule ]  
})
export class AppComponent {
  title = 'FxProject';
}
