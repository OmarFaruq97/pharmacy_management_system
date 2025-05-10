import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private api = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}
  addMedicine(data: any): Observable<any> {
    return this.http.post(`${this.api}/receive`, data);
  }

  getAllMedicine(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/all`);
  }

  deleteMedicineByName(name: string): Observable<any> {
    return this.http.delete(`${this.api}/delete-by-name?name=${name}`);
  }
}
