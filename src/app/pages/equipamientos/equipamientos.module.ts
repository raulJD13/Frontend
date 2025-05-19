import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipamientosPageRoutingModule } from './equipamientos-routing.module';

import { EquipamientosPage } from './equipamientos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipamientosPageRoutingModule
  ],
  declarations: [EquipamientosPage]
})
export class EquipamientosPageModule {}
