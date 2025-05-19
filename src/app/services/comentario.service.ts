import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service'; // Asegúrate de que este servicio maneja el token

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private apiUrl = 'http://localhost:8083/api/comentarios'; // Asegúrate de usar la URL correcta del backend

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken(); // Obtener el token del servicio de autenticación

    if (!token) {
      console.error('No se encontró el token en LoginService');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Obtener todos los comentarios
  getComentarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Obtener un comentario por ID
  getComentarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Crear un nuevo comentario
  createComentario(comentario: any, idUsuario: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}?idUsuario=${idUsuario}`,
      comentario,
      { headers: this.getHeaders() }
    );
  }

  // Actualizar un comentario
  updateComentario(
    id: number,
    comentario: any,
    idUsuario?: number
  ): Observable<any> {
    let url = `${this.apiUrl}/${id}`;
    if (idUsuario) {
      url += `?idUsuario=${idUsuario}`;
    }
    return this.http.put<any>(url, comentario, { headers: this.getHeaders() });
  }

  deleteComentario(id: number): Observable<any> {
    console.log('Enviando solicitud para eliminar comentario con ID:', id); // Verificamos si el id es correcto
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  // Obtener comentarios por actividad
  getComentariosByActividad(idActividad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actividad/${idActividad}`, {
      headers: this.getHeaders(),
    });
  }
}