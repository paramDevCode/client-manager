import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';  
import { RegisterRequest, LoginRequest, AuthResponse } from '../auth/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
register(data: RegisterRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data);
}

login(data: LoginRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data, { withCredentials: true });
}


  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

 resetPassword(token: string, password: string) {
  return this.http.post(`/api/auth/reset-password/${token}`, { password });
}
   isLoggedIn(): boolean {
     return !!localStorage.getItem('token');
  }

   logout(): void {
    localStorage.removeItem('token');
   }

}
