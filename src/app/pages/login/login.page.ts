import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  continuar() {
    if (!this.email || !this.password) {
      alert('Por favor, ingresa el correo y la contraseña.');
      return;
    }

    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);

        const token     = response.token;
        const idUsuario = response.idUsuario;

        if (token && idUsuario != null) {
          // Guardamos token e ID de usuario en localStorage
          this.loginService.saveToken(token);
          localStorage.setItem('idUsuario', idUsuario.toString());

          // Redirigimos a la página de deportes
          this.router.navigate(['/deportes']);
        } else {
          alert('Error: No se recibió token o idUsuario en la respuesta.');
        }
      },
      (error) => {
        console.error('Error en login:', error);
        alert('Credenciales incorrectas o usuario no encontrado.');
      }
    );
  }
}
