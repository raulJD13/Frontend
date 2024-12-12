import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  // URL de la API backend para obtener actividades
  private apiUrl = 'http://localhost:8083/api/actividades'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  // Método para obtener las actividades de un deporte dado su id
  getActividadesByDeporte(idDeporte: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deporte/${idDeporte}`);
  }
}
