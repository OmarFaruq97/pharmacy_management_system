import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewCategoryService {

  private apiUrl = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  addCategory(category: string): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, {category});
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
