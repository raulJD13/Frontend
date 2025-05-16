import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from 'src/app/services/comentario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  comentarios: any[] = [];
  nuevoComentario: string = '';
  editandoComentario: any = null;
  idUsuario: number | null = null;
  idActividad: number | null = null;

  constructor(
    private comentarioService: ComentarioService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const actividadIdFromRoute =
      this.route.snapshot.paramMap.get('idActividad');
    console.log('ID Actividad desde ruta:', actividadIdFromRoute);

    if (actividadIdFromRoute) {
      this.idActividad = Number(actividadIdFromRoute);
      this.loadComentarios();
    }

    this.idUsuario = this.obtenerIdUsuario();
    console.log('ID Usuario:', this.idUsuario);
  }

  loadComentarios() {
    if (this.idActividad) {
      this.comentarioService
        .getComentariosByActividad(this.idActividad)
        .subscribe(
          (data) => {
            console.log('Comentarios cargados:', data);
            this.comentarios = data;
          },
          (error) => {
            console.error('Error al cargar comentarios:', error);
          }
        );
    }
  }

  obtenerIdUsuario(): number | null {
    const id = localStorage.getItem('idUsuario');
    return id ? Number(id) : null;
  }

  agregarComentario() {
    if (!this.nuevoComentario.trim() || !this.idUsuario || !this.idActividad) {
      console.error('Faltan datos para agregar comentario.');
      console.log('nuevoComentario:', this.nuevoComentario);
      console.log('idUsuario:', this.idUsuario);
      console.log('idActividad:', this.idActividad);
      return;
    }

    const comentario = {
      texto: this.nuevoComentario,
      actividad: { idActividad: this.idActividad },
    };

    this.comentarioService
      .createComentario(comentario, this.idUsuario)
      .subscribe(
        (data) => {
          this.comentarios.push(data);
          this.nuevoComentario = '';
        },
        (error) => {
          console.error('Error al crear el comentario:', error);
        }
      );
  }

  editarComentario(comentario: any) {
    this.editandoComentario = { ...comentario };
  }

  guardarEdicion() {
    if (this.editandoComentario && this.editandoComentario.texto.trim()) {
      this.editandoComentario.idActividad = this.idActividad;

      this.comentarioService
        .updateComentario(
          this.editandoComentario.idComentario,
          this.editandoComentario
        )
        .subscribe(
          () => {
            const index = this.comentarios.findIndex(
              (c) => c.idComentario === this.editandoComentario.idComentario
            );
            if (index !== -1) {
              this.comentarios[index] = { ...this.editandoComentario };
            }
            this.editandoComentario = null;
          },
          (error) => {
            console.error('Error al actualizar comentario:', error);
          }
        );
    }
  }

  cancelarEdicion() {
    this.editandoComentario = null;
  }

  eliminarComentario(idComentario: number) {
    this.comentarioService.deleteComentario(idComentario).subscribe(
      () => {
        this.comentarios = this.comentarios.filter(
          (c) => c.idComentario !== idComentario
        );
      },
      (error) => {
        console.error('Error al eliminar comentario:', error);
      }
    );
  }
}
