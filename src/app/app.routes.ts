import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { FormularioPartidoComponent } from './components/formulario-partido/formulario-partido.component';

export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'crear-partido', component: FormularioPartidoComponent },
  // Dejamos el inicio para la galería, pero luego la protegeremos
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' }
];