import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeportePageRoutingModule } from './deporte-routing.module';
import { DeportePage } from './deporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportePageRoutingModule
  ],
  declarations: [DeportePage]
})
export class DeportePageModule {}
