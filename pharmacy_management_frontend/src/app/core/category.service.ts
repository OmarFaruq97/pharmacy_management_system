import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  addCategory(newCategory: { category: string; }) {
    throw new Error('Method not implemented.');
  }
  deleteCategory(id: number) {
    throw new Error('Method not implemented.');
  }
  getAllCategories() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  add(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 
}
