import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'access-token';
  private roleSubject = new BehaviorSubject <string | null> (null);

  constructor(private http: HttpClient, private router: Router) {}

  login (credentials: {email: string; password: string}) {
    return this.http.post<any>('http:localhost:8080/api/auth/login', credentials);

  }
  setToken(token : string){
    localStorage.setItem(this.tokenKey, token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.roleSubject.next(payload.role);
  }

  getRole(){
    return this.roleSubject.asObservable();
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    this.roleSubject.next(null);
    this.router.navigate(['/'], { replaceUrl: true });
  }

  getToken(){
    return localStorage.getItem(this.tokenKey)
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role.toLowerCase();
  }
}