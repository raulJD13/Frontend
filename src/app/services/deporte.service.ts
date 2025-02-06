import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {
  private apiUrl = 'http://localhost:8083/api/deportes'; // URL del backend

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No se encontró el token en localStorage');
      return new HttpHeaders(); // Retorna headers vacíos si no hay token
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  
  getAllDeportes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getDeporteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createDeporte(deporte: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, deporte, { headers: this.getHeaders() });
  }

  updateDeporte(id: number, deporte: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, deporte, { headers: this.getHeaders() });
  }

  deleteDeporte(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }


  uploadImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    });

    return this.http.post<{ fileUrl: string }>('http://localhost:8083/api/files/upload', formData, { headers });
  }
}
