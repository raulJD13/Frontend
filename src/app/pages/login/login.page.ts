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

  constructor(private router: Router, private loginService: LoginService) {}

  continuar() {
    if (!this.email || !this.password) {
      alert('Por favor, ingresa el correo y la contraseña.');
      return;
    }

    // Llamada al servicio de login
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response); // Depuración

        // Verificamos si el servidor respondió con el token
        if (response && response.token) {
          // Guardamos el token
          this.loginService.saveToken(response.token);
          console.log('Token guardado correctamente:', response.token);

          // Redirigir a la página principal o de deportes
          this.router.navigate(['/deportes']);
        } else {
          alert('Error: No se recibió un token válido.');
        }
      },
      (error) => {
        console.error('Error en login:', error);
        alert('Credenciales incorrectas o usuario no encontrado.');
      }
    );
  }
}
