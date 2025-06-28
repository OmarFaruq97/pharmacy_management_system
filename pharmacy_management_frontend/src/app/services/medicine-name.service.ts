import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MedicineName {
  id: number;
  medicineName: string;
}

@Injectable({
  providedIn: 'root'
})


export class MedicineNameService {

  private baseUrl = 'http://localhost:8080/api/medicine-name';

  constructor(private http: HttpClient) { }

  getAll(): Observable<MedicineName[]> {
    return this.http.get<MedicineName[]>(this.baseUrl);
  }

  add(medicineName: string): Observable<MedicineName> {
    return this.http.post<MedicineName>(this.baseUrl, { medicineName });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
