import { Component, OnInit } from '@angular/core';
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
  errorMessage: string = '';
  idUsuario: number | null = null; // ID del usuario autenticado

  constructor(
    private comentarioService: ComentarioService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loadComentarios();
    this.idUsuario = this.obtenerIdUsuario(); // Obtener ID del usuario autenticado
    if (!this.idUsuario) {
      console.error('El usuario no está autenticado o no tiene un ID válido.');
    }
  }

  // Obtener ID del usuario autenticado
  obtenerIdUsuario(): number | null {
    const token = this.loginService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar token JWT
      return payload.idUsuario; // Ajusta el nombre del campo según tu backend
    }
    return null;
  }

  // Cargar todos los comentarios
  loadComentarios() {
    this.comentarioService.getComentarios().subscribe(
      (data) => {
        this.comentarios = data;
        // Verificar si algún comentario tiene el ID como undefined
        this.comentarios.forEach((comentario) => {
          if (!comentario.id) {
            console.error('Comentario sin ID:', comentario);
          }
        });
      },
      (error) => {
        console.error('Error al cargar los comentarios:', error);
        this.errorMessage = 'No se pudieron cargar los comentarios.';
      }
    );
  }

  // Crear un nuevo comentario
  agregarComentario() {
    if (!this.nuevoComentario.trim() || !this.idUsuario) {
      console.error(
        'No se puede agregar un comentario sin texto o sin ID de usuario.'
      );
      return;
    }

    const comentario = { texto: this.nuevoComentario };

    this.comentarioService
      .createComentario(comentario, this.idUsuario)
      .subscribe(
        (data) => {
          this.comentarios.push(data);
          this.nuevoComentario = ''; // Limpiar campo
        },
        (error) => {
          console.error('Error al crear el comentario:', error);
        }
      );
  }

  // Activar edición de un comentario
  editarComentario(comentario: any) {
    if (!comentario.id) {
      console.error('Comentario no tiene ID para editar.');
      return;
    }
    this.editandoComentario = { ...comentario };
  }

  // Guardar cambios de un comentario editado
  guardarEdicion() {
    if (
      !this.editandoComentario ||
      !this.editandoComentario.id ||
      !this.editandoComentario.texto.trim()
    ) {
      console.error('El comentario o el ID es inválido');
      return;
    }

    this.comentarioService
      .updateComentario(this.editandoComentario.id, this.editandoComentario)
      .subscribe(
        () => {
          const index = this.comentarios.findIndex(
            (c) => c.id === this.editandoComentario.id
          );
          if (index !== -1) {
            this.comentarios[index] = this.editandoComentario;
          }
          this.editandoComentario = null;
        },
        (error) => {
          console.error('Error al actualizar el comentario:', error);
        }
      );
  }

  eliminarComentario(id: number) {
    if (!id) {
      console.error('El ID del comentario es inválido');
      return;
    }

    console.log('Eliminando comentario con ID:', id); // Verificamos que el ID es correcto

    // Verificar si el id es válido antes de enviar la solicitud
    if (!id || id === null || id === undefined) {
      console.error('El ID del comentario es nulo o indefinido');
      return;
    }

    // Llamada al servicio para eliminar el comentario
    this.comentarioService.deleteComentario(id).subscribe(
      (response) => {
        console.log('Comentario eliminado con éxito:', response); // Si la llamada tiene éxito
        // Filtrar el comentario de la lista después de la eliminación
        this.comentarios = this.comentarios.filter((c) => c.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el comentario:', error);
        this.errorMessage = 'No se pudo eliminar el comentario.';
      }
    );
  }
}
