import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FxRatesResponse } from './fx.model';

@Injectable({
  providedIn: 'root'
})
export class FxService {
  constructor(private http: HttpClient) { }

  getFxRates(base: string, target: string): Observable<FxRatesResponse> {
    return this.http.get<FxRatesResponse>(`http://localhost:8080/api/fx?base=${base}&target=${target}`);
  }
}
