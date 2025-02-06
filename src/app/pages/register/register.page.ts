import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  registrarse() {
    // Aquí puedes agregar la lógica para el registro
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);

    // Redirigir a otra ruta después del registro
    this.router.navigate(['/login']);
  }
}
