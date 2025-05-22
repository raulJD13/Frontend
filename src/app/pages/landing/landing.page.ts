import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  isLoading = true;
  showIcons = false;

  constructor(private loadingCtrl: LoadingController) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      backdropDismiss: false,
    });
    await loading.present();

    setTimeout(async () => {
      this.isLoading = false;
      await loading.dismiss();

      // Mostrar íconos 1 segundo después de quitar el loading
      setTimeout(() => {
        this.showIcons = true;
      }, 1000);
    }, 2000);
  }
}
