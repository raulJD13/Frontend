import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/usuarios/login'; // URL del backend (ajusta según corresponda)
  private registerUrl = 'http://localhost:8080/api/usuarios'; // URL para registro
  private tokenKey = 'auth_token'; // Nombre del token en localStorage

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email: email, contraseña: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
        localStorage.setItem('idUsuario', response.idUsuario); // 👈 Guardar el ID del usuario
      })
    );
  }
  register(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.registerUrl, usuario, { headers });
  }

  saveToken(token: string): void {
    console.log('Guardando token:', token); // Depuración
    localStorage.setItem(this.tokenKey, token); // Guardamos el token en localStorage
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Recuperamos el token
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verificamos si hay un token guardado
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); // Eliminamos el token de localStorage al cerrar sesión
  }
}
