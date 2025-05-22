import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  private apiUrl = 'http://localhost:8083/api/actividades';

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

  // Método nuevo para subir imágenes
  uploadImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`,
    });

    return this.http.post<{ fileUrl: string }>(
      'http://localhost:8083/api/files/upload',
      formData,
      { headers }
    );
  }

  getActividadesByDeporte(idDeporte: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deporte/${idDeporte}`, {
      headers: this.getHeaders(),
    });
  }

  createActividad(actividad: any, deporteId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}?deporteId=${deporteId}`,
      actividad,
      { headers: this.getHeaders() }
    );
  }

  updateActividad(id: number, actividad: any): Observable<any> {
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