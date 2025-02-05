import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeporteService } from 'src/app/services/deporte.service';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.page.html',
  styleUrls: ['./deporte.page.scss'],
})
export class DeportePage implements OnInit {
  deporte: any = { nombre: '', tipo: 'tierra', imagen: '' };
  isEdit = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deporteService: DeporteService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.deporteService.getDeporteById(+id).subscribe((data) => {
        this.deporte = data;
      });
    }
  }

  saveDeporte() {
    if (!this.deporte.nombre.trim()) {
      this.errorMessage = 'El nombre del deporte no puede estar vacío';
      return;
    }

    this.errorMessage = '';

    if (this.isEdit) {
      this.deporteService
        .updateDeporte(this.deporte.idDeporte, this.deporte)
        .subscribe(() => {
          this.router.navigate(['/deportes']);
        });
    } else {
      this.deporteService.createDeporte(this.deporte).subscribe(() => {
        this.router.navigate(['/deportes']);
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.deporteService.uploadImage(file).subscribe({
        next: (response: { fileUrl: string }) => {
          this.deporte.imagen = response.fileUrl;
        },
        error: (err) => {
          console.error('Error al subir la imagen:', err);
          alert('No se pudo cargar la imagen. Intenta nuevamente.');
        },
      });
    }
  }
}
