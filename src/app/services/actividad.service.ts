import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service'; // Asegúrate de importar el servicio de login

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  private apiUrl = 'http://localhost:8080/api/actividades'; // URL del backend

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Método para obtener los encabezados con el token
  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken();

    console.log('Token en ActividadService:', token); // Para depuración

    if (!token) {
      console.error('No se encontró el token en LoginService');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Obtener actividades de un deporte por su ID
  getActividadesByDeporte(idDeporte: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deporte/${idDeporte}`, {
      headers: this.getHeaders(),
    });
  }

  // Crear una nueva actividad
  createActividad(actividad: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, actividad, {
      headers: this.getHeaders(),
    });
  }

  // Actualizar una actividad
  updateActividad(id: number, actividad: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, actividad, {
      headers: this.getHeaders(),
    });
  }

  // Eliminar una actividad por ID
  deleteActividad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
