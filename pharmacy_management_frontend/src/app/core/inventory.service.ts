import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  deleteMedicineByName(name: string) {
    throw new Error('Method not implemented.');
  }
  private api = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}
  addMedicine(data: any): Observable<any> {
    return this.http.post(`${this.api}/receive`, data);
  }

  getAllMedicine(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/all`);
  }

  deleteMedicineByNameAndStrength(name: string, strength: string): Observable<any> {
    return this.http.delete(`${this.api}
      /delete-by-name-and-strength
      ?name=${name}&strength=${strength}`);
  }

  updateByNameAndStrength(name: string, strength: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.api}
      /update-by-name-and-strength
      ?itemName=${name}&strength=${strength}`, updatedData);
  }
}