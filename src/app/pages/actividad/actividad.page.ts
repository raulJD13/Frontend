import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {
  actividad: any = {
    id: null, // 🔹 Agregado para evitar undefined
    nombre: '',
    descripcion: '',
    precio: null,
    valoracion: null,
    imagen: '',
    id_deporte: null, // Asegurar que se envíe al backend
  };

  errorMessage: string = '';
  isEditing: boolean = false;

  constructor(
    private actividadService: ActividadService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    // Obtener id_deporte desde el state o la URL
    const state = this.location.getState() as { deporteId?: number };
    const deporteIdFromRoute = this.route.snapshot.paramMap.get('deporteId');
    const actividadId = this.route.snapshot.paramMap.get('id');

    if (state && state.deporteId) {
      this.actividad.id_deporte = state.deporteId;
    } else if (deporteIdFromRoute) {
      this.actividad.id_deporte = Number(deporteIdFromRoute);
    } else {
      console.warn('No se encontró id_deporte.');
    }

    if (actividadId) {
      this.isEditing = true;
      this.actividadService.getActividadById(Number(actividadId)).subscribe(
        (data) => {
          this.actividad = data;

          // 🔹 Asegurar que el ID se establece correctamente
          this.actividad.id = Number(actividadId);

          console.log('Actividad cargada:', this.actividad);
          if (!this.actividad.id_deporte) {
            this.actividad.id_deporte =
              this.actividad.deporte?.idDeporte || null;
          }
        },
        (error) => {
          console.error('Error al cargar la actividad:', error);
        }
      );
    }
  }

  saveActividad() {
    if (!this.actividad.nombre || !this.actividad.precio) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    console.log('Guardando actividad:', this.actividad);

    if (this.isEditing) {
      if (!this.actividad.id) {
        console.error('Error: ID de la actividad es undefined.');
        return; // Evitar enviar una petición incorrecta
      }

      this.actividadService
        .updateActividad(this.actividad.id, this.actividad)
        .subscribe(() => {
          console.log('Actividad actualizada.');
          this.router.navigate([`/actividades/${this.actividad.id_deporte}`]);
        });
    } else {
      this.actividadService
        .createActividad(this.actividad, this.actividad.id_deporte as number)
        .subscribe(() => {
          console.log('Actividad creada.');
          this.router.navigate([`/actividades/${this.actividad.id_deporte}`]);
        });
    }
  }

  cancel() {
    console.log('Cancelando, volviendo a actividades.');
    this.router.navigate([`/actividades/${this.actividad.id_deporte}`]);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.actividad.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
