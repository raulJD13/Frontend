import { Component, OnInit } from '@angular/core';
import { DeporteService } from 'src/app/services/deporte.service';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
})
export class DeportesPage implements OnInit {
  deportes: any[] = [];
  token: string | null = null; // Definir el token

  constructor(private deporteService: DeporteService) {}

  ngOnInit() {
    // Intentamos obtener el token del localStorage
    this.token = localStorage.getItem('auth_token');
    if (this.token) {
      console.log('Token encontrado:', this.token); // Verificar que el token se haya encontrado correctamente
      this.loadDeportes();
    } else {
      console.error('No se encontró el token en el localStorage');
      alert('No estás autenticado. Por favor, inicia sesión nuevamente.');
    }
  }

  loadDeportes() {
    if (this.token) {
      // Asegúrate de pasar el token a tu servicio
      this.deporteService.getAllDeportes().subscribe(
        (data) => {
          this.deportes = data;
        },
        (error) => {
          console.error('Error al cargar los deportes:', error);
          alert('Hubo un problema al cargar los deportes.');
        }
      );
    } else {
      alert('Token no disponible. Debes iniciar sesión.');
    }
  }

  deleteDeporte(id: number) {
    if (this.token) {
      this.deporteService.deleteDeporte(id).subscribe(
        () => {
          this.loadDeportes();
        },
        (error) => {
          console.error('Error al eliminar el deporte:', error);
          alert('Hubo un problema al eliminar el deporte.');
        }
      );
    } else {
      alert('Token no disponible. Debes iniciar sesión.');
    }
  }
}
