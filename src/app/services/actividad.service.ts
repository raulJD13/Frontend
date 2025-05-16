import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  private apiUrl = 'http://localhost:8080/api/actividades';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken();

    if (!token) {
      console.error('No se encontró el token en LoginService');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getActividadesByDeporte(idDeporte: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deporte/${idDeporte}`, {
      headers: this.getHeaders(),
    });
  }

  createActividad(actividad: any, deporteId: number): Observable<any> {
    actividad.deporte = { idDeporte: deporteId };

    return this.http.post<any>(this.apiUrl, actividad, {
      headers: this.getHeaders(),
    });
  }

  updateActividad(id: number, actividad: any): Observable<any> {
    actividad.deporte = { idDeporte: actividad.id_deporte };

    return this.http.put<any>(`${this.apiUrl}/${id}`, actividad, {
      headers: this.getHeaders(),
    });
  }

  deleteActividad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getActividadById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
