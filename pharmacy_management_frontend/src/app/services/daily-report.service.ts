import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getTodaySales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/invoice/daily-sales`);
  }

  getTodayReceives(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/inventory/daily-receives`);
  }
}
