import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private api = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  // POST: Add new medicine
  addMedicine(data: any): Observable<any> {
    return this.http.post(`${this.api}/receive`, data);
  }

  // GET: Retrieve all medicines
  getAllMedicine(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/all`);
  }


  deleteMedicineByNameAndCategory(name: string, category: string): Observable<any> {
  const trimmedName = name.trim();
  const trimmedCategory = category.trim();
  return this.http.delete(
    `${this.api}/delete-by-name-and-category?name=${encodeURIComponent(trimmedName)}&category=${encodeURIComponent(trimmedCategory)}`
  );
}


  // PUT: Update by name and category
  updateByNameAndCategory(name: string, category: string, updatedData: any): Observable<any> {
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    return this.http.put(
      `${this.api}/update-by-name-and-category?name=${encodeURIComponent(trimmedName)}&category=${encodeURIComponent(trimmedCategory)}`,
      updatedData
    );
  }  

  //add companies
  getAllCompanies(): Observable<string[]> {
  return this.http.get<string[]>(`${this.api}/companies`);
}

getLowStockItems() {
  return this.http.get<any[]>('http://localhost:8080/api/inventory/low-stock');
}

getSufficientStockItems() {
  return this.http.get<any[]>('http://localhost:8080/api/inventory/sufficient-stock');
}


}
