import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

export interface ActividadEquipamiento {
  id: number;
  cantidad: number;
  actividad: { id: number };
  equipamiento: Equipamiento;
}

export interface Equipamiento {
  id?: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EquipamientosService {
  private aeUrl = 'http://localhost:8083/api/actividad-equipamientos';
  private eUrl  = 'http://localhost:8083/api/equipamientos';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  private headers(): HttpHeaders {
    const token = this.loginService.getToken()!;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  /** Recupera todos los vínculos de una actividad */
  getByActividad(actividadId: number): Observable<ActividadEquipamiento[]> {
    return this.http.get<ActividadEquipamiento[]>(
      `${this.aeUrl}/por-actividad/${actividadId}`,
      { headers: this.headers() }
    );
  }

  /** Actualiza únicamente la cantidad del vínculo */
  updateCantidad(id: number, cantidad: number): Observable<any> {
    return this.http.put(
      `${this.aeUrl}/${id}`,
      { cantidad },
      { headers: this.headers() }
    );
  }

  /**
   * Crea un nuevo equipamiento en su tabla
   * y luego vincula ese equipamiento a la actividad.
   */
  link(actividadId: number, equip: Equipamiento, cantidad: number): Observable<any> {
    return this.http.post(
      this.aeUrl,
      {
        actividad:   { id: actividadId },
        equipamiento:{ id: equip.id },
        cantidad
      },
      { headers: this.headers() }
    );
  }

  /** Crea un Equipamiento en su propia tabla */
  createEquip(e: Equipamiento): Observable<Equipamiento> {
    return this.http.post<Equipamiento>(
      this.eUrl,
      e,
      { headers: this.headers() }
    );
  }

  /** Actualiza los datos de un Equipamiento existente */
  updateEquip(id: number, e: Equipamiento): Observable<Equipamiento> {
    return this.http.put<Equipamiento>(
      `${this.eUrl}/${id}`,
      e,
      { headers: this.headers() }
    );
  }

  /** Elimina el vínculo actividad–equipamiento */
  deleteLink(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.aeUrl}/${id}`,
      { headers: this.headers() }
    );
  }
}
