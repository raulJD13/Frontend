import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  localizacion: string = '';
  fotoPerfil: string = '';
  fotoFondoPerfil: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  register() {
    if (!this.email || !this.password) {
      alert('Por favor, ingresa el correo y la contraseña.');
      return;
    }

    // Extraer username desde el email (antes del @)
    const username = this.email.split('@')[0];

    const usuario = {
      username: username,
      email: this.email,
      contraseña: this.password,
      localizacion: this.localizacion,
      fotoPerfil: this.fotoPerfil,
      fotoFondoPerfil: this.fotoFondoPerfil,
    };

    this.loginService.register(usuario).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);

        if (response && response.token) {
          this.loginService.saveToken(response.token);
          this.router.navigate(['/deportes']); // Redirigir tras el registro
        } else {
          alert('Error al registrar el usuario.');
        }
      },
      (error) => {
        console.error('Error en el registro:', error);
        alert('Hubo un problema al registrar el usuario.');
      }
    );
  }
}
