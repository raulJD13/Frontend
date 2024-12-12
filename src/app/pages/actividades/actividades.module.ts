import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Opcional, necesario si usas formularios en la página
import { IonicModule } from '@ionic/angular'; // Importar el módulo de Ionic
import { ActividadesPage } from './actividades.page';
import { ActividadesPageRoutingModule } from './actividades-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Incluye formularios si los necesitas
    IonicModule, // Esencial para los componentes de Ionic
    ActividadesPageRoutingModule
  ],
  declarations: [ActividadesPage]
})
export class ActividadesPageModule {}
