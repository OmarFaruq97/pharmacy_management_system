import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyMedicineServiceService {
  private baseUrl = 'http://localhost:8080/api/access-company-medicine';

  constructor(private http : HttpClient) { }

  addCompanyMedicine(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  getAllCompanyMedicines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}
