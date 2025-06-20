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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set content type

    return this.http.post<UserResponse>(url, registerRequest, { headers })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  /**
   * Error handler for HTTP requests.
   * @param error The error object.
   * @returns An Observable that throws the error.
   */
  private handleError(error: any): Observable<any> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error?.message || 'Server error'}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Use throwError
  }
}
export interface RegisterRequest {
  email: string;
  password: string;
  role: string; //  Use string, or create an Enum/Type for Role if needed
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface UserResponse {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}