import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private actividadService: ActividadService,
    private alertController: AlertController,
    private router: Router
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

  async eliminarActividad(idActividad: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Actividad',
      message: '¿Estás seguro de que deseas eliminar esta actividad?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (!this.token) {
              console.error('Token no disponible. Debes iniciar sesión.');
              console.error('Token no disponible. Debes iniciar sesión.');
              return;
            }

            this.actividadService.deleteActividad(idActividad).subscribe(
              () => {
                console.log(`Actividad ${idActividad} eliminada correctamente`);
                this.cargarActividades(); // Recargar la lista después de eliminar
              },
              (error) => {
                console.error('Error al eliminar la actividad:', error);

                if (error.status === 403) {
                  console.error(
                    'No tienes permisos para eliminar esta actividad.'
                  );
                } else if (error.status === 401) {
                  console.error(
                    'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
                  );
                } else {
                  console.error('Hubo un problema al eliminar la actividad.');
                }
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  irAComentarios(idActividad: number) {
    this.router.navigate([`/comentarios/${idActividad}`]);
  }

  irAEditar(idActividad: number) {
    this.router.navigate(['/actividad', idActividad]);
  }
}
