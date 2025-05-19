import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipamientosPage } from './equipamientos.page';

const routes: Routes = [
  {
    path: '',
    component: EquipamientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipamientosPageRoutingModule {}
