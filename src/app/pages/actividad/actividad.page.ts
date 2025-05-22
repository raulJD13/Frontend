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
    nombre: '',
    descripcion: '',
    precio: null,
    valoracion: null,
    imagen: '',
    deporte: { idDeporte: null }
  };

  errorMessage: string = '';
  isEditing: boolean = false;
  actividadId: number | null = null;

  constructor(
    private actividadService: ActividadService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    const actividadId = this.route.snapshot.paramMap.get('id');
    const state = this.location.getState() as { deporteId?: number };

    if (state?.deporteId) {
      this.actividad.deporte.idDeporte = state.deporteId;
    }

    if (actividadId && actividadId !== 'new') {
      this.isEditing = true;
      this.actividadId = +actividadId;
      this.loadActividad(this.actividadId);
    }
  }

  private loadActividad(id: number) {
    this.actividadService.getActividadById(id).subscribe(
      (data) => {
        this.actividad = data;
        if (!this.actividad.deporte) {
          this.actividad.deporte = { idDeporte: this.actividad.id_deporte };
        }
      },
      (error) => {
        console.error('Error al cargar la actividad:', error);
      }
    );
  }

  saveActividad() {
    if (!this.validateForm()) return;

    if (this.isEditing && this.actividadId != null) {
      this.updateActividad(this.actividadId);
    } else {
      this.createActividad();
    }
  }

  private validateForm(): boolean {
    this.errorMessage = '';

    if (!this.actividad.nombre?.trim()) {
      this.errorMessage = 'El nombre es obligatorio';
      return false;
    }

    if (!this.actividad.precio || this.actividad.precio < 0) {
      this.errorMessage = 'El precio debe ser un valor positivo';
      return false;
    }

    return true;
  }

  private createActividad() {
    if (!this.actividad.deporte.idDeporte) {
      console.error('ID de deporte no definido');
      return;
    }

    this.actividadService
      .createActividad(this.actividad, this.actividad.deporte.idDeporte)
      .subscribe({
        next: () => this.navigateBack(),
        error: (err) => this.handleError(err)
      });
  }

  private updateActividad(id: number) {
    this.actividadService.updateActividad(id, this.actividad)
      .subscribe({
        next: () => this.navigateBack(),
        error: (err) => this.handleError(err)
      });
  }

  private navigateBack() {
    if (this.actividad.deporte.idDeporte) {
      this.router.navigate([`/actividades/${this.actividad.deporte.idDeporte}`]);
    } else {
      this.router.navigate(['/deportes']);
    }
  }

  private handleError(error: any) {
    console.error('Error:', error);
    this.errorMessage = error.error?.message || 'Error desconocido';
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.actividadService.uploadImage(file).subscribe({
      next: (response) => {
        this.actividad.imagen = response.fileUrl;
      },
      error: (err) => {
        console.error('Error al subir imagen:', err);
        this.errorMessage = 'Error al subir la imagen';
      }
    });
  }

  cancel() {
    this.navigateBack();
  }
}
