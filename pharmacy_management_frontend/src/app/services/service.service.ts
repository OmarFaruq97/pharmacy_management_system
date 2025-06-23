import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   * @param registerRequest The registration data.
   * @returns An Observable containing the UserResponse on success, or an error on failure.
   */
  registerUser(registerRequest: RegisterRequest): Observable<UserResponse> {
    const url = `${this.baseUrl}/api/auth/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<UserResponse>(url, registerRequest, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves all users (admin only).
   */
  // getAllUsers(): Observable<UserResponse[]> {
  //   return this.http.get<UserResponse[]>(`${this.baseUrl}/api/users`) // secured endpoint
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  getAllUsers(): Observable<UserResponse[]> {
  const token = localStorage.getItem('accessToken'); // or wherever you store your token
  if (!token) {
    throw new Error('No access token found. Please login first.');
  }
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<UserResponse[]>(`${this.baseUrl}/api/users`, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

getToken(): string | null {
  return localStorage.getItem('accessToken');
}




  

  /**
   * Error handler for HTTP requests.
   * @param error The error object.
   * @returns An Observable that throws the error.
   */
  private handleError(error: any): Observable<any> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error?.message || 'Server error'}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: string; // 'ADMIN' or 'PHARMACIST'
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
