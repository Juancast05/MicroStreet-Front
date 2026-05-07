import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { FormularioPartidoComponent } from './components/formulario-partido/formulario-partido.component';
import { LoginComponent } from './components/login/login.component';
import { GaleriaComponent } from './components/galeria/galeria.component'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'crear-partido', component: FormularioPartidoComponent },
  
  // 2. Creamos la ruta oficial para la galería
  { path: 'galeria', component: GaleriaComponent }, 

  // Al abrir la app, nos manda al login por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' }
];