import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://localhost:8080/api/invoice';

  constructor(private http: HttpClient) {}

  createInvoice(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/create`, data);
  } 


  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  updateInvoice(invoiceNumber: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${invoiceNumber}`, data);
  }

  deleteInvoice(invoiceNumber: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${invoiceNumber}`);
  } 
}