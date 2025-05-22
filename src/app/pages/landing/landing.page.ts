import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  isLoading = true;

  constructor(private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    // mostramos loading nativo (opcional)
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      backdropDismiss: false,
    });
    await loading.present();

    // simulamos carga de 2 s
    setTimeout(async () => {
      this.isLoading = false;     // quita el overlay-spinner y muestra botones
      await loading.dismiss();    // cierra el LoadingController
    }, 2000);
  }
}
