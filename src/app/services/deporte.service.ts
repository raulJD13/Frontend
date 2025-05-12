import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service'; // Asegúrate de que LoginService esté importado correctamente

@Injectable({
  providedIn: 'root',
})
export class DeporteService {
  private apiUrl = 'http://localhost:8083/api/deportes'; // URL del backend

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Método para obtener los encabezados, incluyendo el token
  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken(); // Obtiene el token desde LoginService

    console.log('Token en getHeaders:', token); // Depuración

    if (!token) {
      console.error('No se encontró el token en LoginService');
      return new HttpHeaders(); // Retorna headers vacíos si no hay token
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Se asegura de que el token esté presente en la cabecera
    });
  }

  // Obtener todos los deportes
  getAllDeportes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Obtener un deporte por su ID
  getDeporteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Crear un nuevo deporte
  createDeporte(deporte: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, deporte, {
      headers: this.getHeaders(),
    });
  }

  // Actualizar un deporte existente
  updateDeporte(id: number, deporte: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, deporte, {
      headers: this.getHeaders(),
    });
  }

  // Eliminar un deporte por su ID
  deleteDeporte(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Subir una imagen
  uploadImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`, // Incluye el token en los headers
    });

    return this.http.post<{ fileUrl: string }>(
      'http://localhost:8080/api/files/upload',
      formData,
      { headers }
    );
  }
}
