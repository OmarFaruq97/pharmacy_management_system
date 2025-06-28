import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Generic {
  id: number;
  generic: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewGenericService {
  private apiUrl = 'http://localhost:8080/api/generic';

  constructor(private http: HttpClient) {}

  getAllGenerics(): Observable<Generic[]> {
    return this.http.get<Generic[]>(this.apiUrl);
  }

  addGeneric(generic: string): Observable<Generic> {
    return this.http.post<Generic>(this.apiUrl, {generic});
  }

  deleteGeneric(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
