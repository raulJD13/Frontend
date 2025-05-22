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
  actividadEquipamientos: ActividadEquipamiento[] = [];

  // Campos para el formulario de nuevo equipamiento
  nuevoEquipamiento: Equipamiento & { cantidad: number } = {
    nombre: '',
    tipo: '',
    descripcion: '',
    cantidad: 1
  };

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
      next: data => this.actividadEquipamientos = data,
      error: err => this.handleError(err)
    });
  }

  /** Disminuye la cantidad */
  decrementarCantidad(item: ActividadEquipamiento) {
    if (item.cantidad > 0) {
      item.cantidad--;
    }
  }

  /** Aumenta la cantidad */
  incrementarCantidad(item: ActividadEquipamiento) {
    item.cantidad++;
  }

  /** Guarda los cambios */
  guardarCambios(item: ActividadEquipamiento) {
    this.actualizar(item);
    this.editarEquip(item);
  }

  /** Elimina el vínculo actividad–equipamiento */
  eliminarVinculo(item: ActividadEquipamiento) {
    this.eliminar(item);
  }

  /** Actualiza solo la cantidad */
  actualizar(item: ActividadEquipamiento) {
    this.svc.updateCantidad(item.id, item.cantidad).subscribe({
      next: () => this.load(),
      error: err => this.handleError(err)
    });
  }

  /** Edita nombre/tipo/descripcion del equipamiento */
  editarEquip(item: ActividadEquipamiento) {
    const eq = item.equipamiento;
    this.svc.updateEquip(eq.id!, eq).subscribe({
      next: () => this.load(),
      error: err => this.handleError(err)
    });
  }

  /** Elimina el vínculo */
  eliminar(item: ActividadEquipamiento) {
    this.svc.deleteLink(item.id).subscribe({
      next: () => this.load(),
      error: err => this.handleError(err)
    });
  }

  /** Añade nuevo equipamiento y lo vincula */
  agregarEquipamiento() {
    const { nombre, tipo, descripcion, cantidad } = this.nuevoEquipamiento;
    if (!nombre || !tipo) return;

    const nuevo: Equipamiento = { nombre, tipo, descripcion };

    this.svc.createEquip(nuevo).subscribe({
      next: eq => {
        this.svc.link(this.actividadId, eq, cantidad).subscribe({
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
    this.nuevoEquipamiento = {
      nombre: '',
      tipo: '',
      descripcion: '',
      cantidad: 1
    };
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
