import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeporteService {
  private apiUrl = 'http://localhost:8080/api/deportes/'; // URL del backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    //const token = localStorage.getItem('jwtToken'); // Obtén el token desde localStorage o desde donde lo guardes
    return new HttpHeaders({
      //'X-Debug-Level': 'verbose',
      //Authorization: `Bearer ${token}`, // Incluye el token en el header de Authorization
      //Authorization:
      //  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJkZW1vSldUIiwic3ViIjoibWllbWFpbCxtaWVtYWlsIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczODc3ODkxOSwiZXhwIjoxNzM4Nzc5NTE5fQ.GBz7UeBx-Xj1i9VL4JFyH9cOLAsUvixHB_wMScaq0Mti6NnWX7Xp2je1UgVMj-LmD9tIzVyn_moxy0cuGqZtIQ',
      //'Content-Type': 'application/json',
    });
  }

  getAllDeportes(): Observable<any[]> {
    //const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJkZW1vSldUIiwic3ViIjoibWllbWFpbCxtaWVtYWlsIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczODc3ODkxOSwiZXhwIjoxNzM4Nzc5NTE5fQ.GBz7UeBx-Xj1i9VL4JFyH9cOLAsUvixHB_wMScaq0Mti6NnWX7Xp2je1UgVMj-LmD9tIzVyn_moxy0cuGqZtIQ',
        'Content-Type': 'application/json',
        //'X-Debug-Level': 'verbose',
      },
    });
    //return this.http.get<any[]>(this.apiUrl);
  }

  getDeporteById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  createDeporte(deporte: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, deporte, { headers });
  }

  updateDeporte(id: number, deporte: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, deporte, { headers });
  }

  deleteDeporte(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  uploadImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const headers = this.getAuthHeaders();
    return this.http.post<{ fileUrl: string }>(
      'http://localhost:8080/api/files/upload',
      formData,
      { headers }
    );
  }
}
