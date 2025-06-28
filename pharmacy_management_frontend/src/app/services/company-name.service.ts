import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyNameService {

  private baseUrl = 'http://localhost:8080/api/company-name';

  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addCompany(company: any): Observable<any> {
    return this.http.post(this.baseUrl, company);
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
