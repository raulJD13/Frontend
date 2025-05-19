import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EquipamientosService,
  ActividadEquipamiento,
  Equipamiento,
} from '../../services/equipamientos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-equipamientos',
  templateUrl: './equipamientos.page.html',
  styleUrls: ['./equipamientos.page.scss'],
})
export class EquipamientosPage implements OnInit {
  actividadId!: number;
  lista: ActividadEquipamiento[] = [];

  // Campos para la creación de nuevo equipamiento
  nuevoNombre = '';
  nuevoTipo = '';
  nuevaDesc = '';
  nuevaCant = 1;

  constructor(
    private route: ActivatedRoute,
    private svc: EquipamientosService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.actividadId = +this.route.snapshot.paramMap.get('actividadId')!;
    this.load();
  }

  load() {
    this.svc.getByActividad(this.actividadId).subscribe({
      next: (data) => (this.lista = data),
      error: (err) => this.handleError(err),
    });
  }

  // Actualizar cantidad
  actualizar(item: ActividadEquipamiento) {
    this.svc.updateCantidad(item.id, item.cantidad).subscribe({
      next: () => {},
      error: (err) => this.handleError(err),
    });
  }

  // Editar detalles del equipamiento
  editarEquip(item: ActividadEquipamiento) {
    const eq = item.equipamiento;
    this.svc.updateEquip(eq.id!, eq).subscribe({
      next: () => {},
      error: (err) => this.handleError(err),
    });
  }

  // Eliminar el vínculo entre actividad y equipamiento
  eliminar(item: ActividadEquipamiento) {
    this.svc.deleteLink(item.id).subscribe({
      next: () => this.load(),
      error: (err) => this.handleError(err),
    });
  }

  // Añadir nuevo equipamiento y vincular
  agregar() {
    if (!this.nuevoNombre || !this.nuevoTipo) return;
    const nuevo: Equipamiento = {
      nombre: this.nuevoNombre,
      tipo: this.nuevoTipo,
      descripcion: this.nuevaDesc,
    };
    // 1) Crear en el catálogo
    this.svc.createEquip(nuevo).subscribe({
      next: (eq) => {
        // 2) Vincular a la actividad
        this.svc.link(this.actividadId, eq, this.nuevaCant).subscribe({
          next: () => {
            this.resetForm();
            this.load();
          },
          error: (err) => this.handleError(err),
        });
      },
      error: (err) => this.handleError(err),
    });
  }

  private resetForm() {
    this.nuevoNombre = '';
    this.nuevoTipo = '';
    this.nuevaDesc = '';
    this.nuevaCant = 1;
  }

  private handleError(err: any) {
    console.error(err);
    this.alertCtrl
      .create({
        header: 'Error',
        message: err.statusText || 'Ha ocurrido un error',
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }
}
