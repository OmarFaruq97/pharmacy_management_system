import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  private baseUrl = 'http://localhost:8080/api/memo';

  constructor(private http: HttpClient) {}

  downloadInvoice(invoiceId: number) {
    return this.http.get(`${this.baseUrl}/invoice/${invoiceId}`, {
      responseType: 'blob', // because it's a PDF
    });
  }

  
}
