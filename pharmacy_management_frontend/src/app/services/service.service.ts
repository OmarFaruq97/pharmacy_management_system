import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerUser(registerRequest: RegisterRequest): Observable<UserResponse> {
    const url = `${this.baseUrl}/api/auth/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<UserResponse>(url, registerRequest, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<UserResponse[]> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found. Please login first.');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<UserResponse[]>(`${this.baseUrl}/api/users`, { headers })
      .pipe(catchError(this.handleError));
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private handleError(error: any): Observable<any> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${
        error.error?.message || 'Server error'
      }`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  salary: number;
}

export interface UserResponse {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  salary?: number;
  createdAt?: string;
  updatedAt?: string;
}
