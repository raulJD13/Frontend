import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeportesPage } from './pages/deportes/deportes.page';
import { DeportePage } from './pages/deporte/deporte.page';
import { ActividadesPage } from './pages/actividades/actividades.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/deportes',  
    pathMatch: 'full',
  },
  {
    path: 'deportes',
    loadChildren: () => import('./pages/deportes/deportes.module').then(m => m.DeportesPageModule)
  },
  {
    path: 'deporte/new', 
    loadChildren: () => import('./pages/deporte/deporte.module').then(m => m.DeportePageModule)
  },
  {
    path: 'deporte/:id', 
    loadChildren: () => import('./pages/deporte/deporte.module').then(m => m.DeportePageModule)
  },
  {
    path: 'actividades/:id',
    loadChildren: () => import('./pages/actividades/actividades.module').then(m => m.ActividadesPageModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
