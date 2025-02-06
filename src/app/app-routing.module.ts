import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeportesPage } from './pages/deportes/deportes.page';
import { DeportePage } from './pages/deporte/deporte.page';
import { ActividadesPage } from './pages/actividades/actividades.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',  // Mantén esta ruta si prefieres redirigir a 'landing'
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
  },
  {
    path: 'actividad',
    loadChildren: () => import('./pages/actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'comentarios',  // Agrega esta ruta si deseas incluirla
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
