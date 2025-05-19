import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  idUsuario: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl     = 'http://localhost:8083/api/usuarios/login';
  private registerUrl= 'http://localhost:8083/api/usuarios';
  private tokenKey   = 'auth_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, contraseña: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.apiUrl, body, { headers });
  }

  register(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.registerUrl, usuario, { headers });
  }

  saveToken(token: string): void {
    console.log('Guardando token:', token);
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('idUsuario');
  }
}
