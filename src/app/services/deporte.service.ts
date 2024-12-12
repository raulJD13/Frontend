import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {
  private apiUrl = 'http://localhost:8083/api/deportes'; // URL del backend

  constructor(private http: HttpClient) {}

  getAllDeportes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDeporteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDeporte(deporte: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, deporte);
  }

  updateDeporte(id: number, deporte: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, deporte);
  }

  deleteDeporte(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ fileUrl: string }>('http://localhost:8083/api/files/upload', formData);
}



  
}
