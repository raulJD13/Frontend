import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {
  actividades: any[] = [];
  deporteId: number | null = null;
  token: string | null = null; // Guardamos el token

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('auth_token'); // Obtener el token del localStorage

    if (!this.token) {
      console.error('No se encontró el token en el localStorage');
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    const deporteId = this.route.snapshot.paramMap.get('id');
    if (deporteId) {
      this.deporteId = +deporteId; // Convertir a número
      this.cargarActividades();
    } else {
      console.error('ID de deporte no encontrado');
    }
  }

  cargarActividades() {
    if (this.deporteId) {
      this.actividadService.getActividadesByDeporte(this.deporteId).subscribe(
        (data) => {
          this.actividades = data;
        },
        (error) => {
          console.error('Error al cargar las actividades:', error);
          alert('Hubo un problema al cargar las actividades.');
        }
      );
    }
  }

  deleteActividad(id: number) {
    if (this.token) {
      this.actividadService.deleteActividad(id).subscribe(
        () => {
          this.cargarActividades();
        },
        (error) => {
          console.error('Error al eliminar la actividad:', error);
          alert('Hubo un problema al eliminar la actividad.');
        }
      );
    } else {
      alert('Token no disponible. Debes iniciar sesión.');
    }
  }
}
