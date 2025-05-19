import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EquipamientosService,
  ActividadEquipamiento,
  Equipamiento
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

  // Campos para el formulario de nuevo equipamiento
  nuevoNombre = '';
  nuevoTipo     = '';
  nuevaDesc     = '';
  nuevaCant     = 1;

  constructor(
    private route: ActivatedRoute,
    private svc: EquipamientosService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.actividadId = +this.route.snapshot.paramMap.get('actividadId')!;
    this.load();
  }

  /** Carga la lista actual */
  load() {
    this.svc.getByActividad(this.actividadId).subscribe({
      next: data => this.lista = data,
      error: err => this.handleError(err)
    });
  }

  /** Actualiza sólo la cantidad */
  actualizar(item: ActividadEquipamiento) {
    this.svc.updateCantidad(item.id, item.cantidad).subscribe({
      next: () => this.load(),
      error: err => this.handleError(err)
    });
  }

  /** Edita los datos de Equipamiento (nombre/tipo/descripción) */
  editarEquip(item: ActividadEquipamiento) {
    const eq = item.equipamiento;
    this.svc.updateEquip(eq.id!, eq).subscribe({
      next: () => this.load(),
      error: err => this.handleError(err)
    });
  }

  /** Elimina el vínculo actividad–equipamiento */
  eliminar(item: ActividadEquipamiento) {
    this.svc.deleteLink(item.id).subscribe({
      next: () => this.load(),
      error: err => this.handleError(err)
    });
  }

  /** Añade un nuevo equipamiento y lo vincula */
  agregar() {
    if (!this.nuevoNombre || !this.nuevoTipo) { return; }

    const nuevo: Equipamiento = {
      nombre: this.nuevoNombre,
      tipo: this.nuevoTipo,
      descripcion: this.nuevaDesc
    };

    // 1) Crear en la tabla equipamientos
    this.svc.createEquip(nuevo).subscribe({
      next: eq => {
        // 2) Crear el vínculo en actividad_equipamientos
        this.svc.link(this.actividadId, eq, this.nuevaCant).subscribe({
          next: () => {
            this.resetForm();
            this.load();
          },
          error: err => this.handleError(err)
        });
      },
      error: err => this.handleError(err)
    });
  }

  private resetForm() {
    this.nuevoNombre = '';
    this.nuevoTipo   = '';
    this.nuevaDesc   = '';
    this.nuevaCant   = 1;
  }

  private handleError(err: any) {
    console.error(err);
    this.alertCtrl.create({
      header: 'Error',
      message: err.statusText || 'Ha ocurrido un error',
      buttons: ['OK']
    }).then(a => a.present());
  }
}
