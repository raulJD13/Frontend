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
  deporteId: number | null = null; // Inicializamos con null para evitar el error de asignación

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService
  ) {}

  ngOnInit() {
    const deporteId = this.route.snapshot.paramMap.get('id');
    if (deporteId) {
      this.deporteId = +deporteId;  // Convertir a número
      this.cargarActividades();
    } else {
      console.error('ID de deporte no encontrado');
    }
  }
  

  cargarActividades() {
    if (this.deporteId) {
      this.actividadService.getActividadesByDeporte(this.deporteId).subscribe(data => {
        this.actividades = data;
      });
    }
  }
}
