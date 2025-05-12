import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastController: ToastController, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          // Si la API no responde o está caída
          if (!navigator.onLine || error.status === 0) {
            // Mostrar un mensaje Toast o redirigir a la página de error
            this.showToast('Espere un momento, el servidor no responde...');
            // Redirigir a la página de "servidor caído"
            this.router.navigate(['/server-down']);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'warning'
    });
    await toast.present();
  }
}
