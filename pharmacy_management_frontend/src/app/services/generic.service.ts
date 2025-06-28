import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private baseUrl = 'http://localhost:8080/api/generic';

  constructor(private http: HttpClient) { }

   getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addGeneric(generic: { generic: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, generic);
  }

  deleteGeneric(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
