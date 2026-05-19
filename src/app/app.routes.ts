import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { FormularioPartidoComponent } from './components/formulario-partido/formulario-partido.component';
import { LoginComponent } from './components/login/login.component';
import { GaleriaComponent } from './components/galeria/galeria.component'; 
import { authGuard } from './guards/auth.guard'; // Arvhico del guardia de autenticación

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  
  // 2. Protegemos las rutas privadas con el authGuard
  { 
    path: 'crear-partido', 
    component: FormularioPartidoComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'galeria', 
    component: GaleriaComponent, 
    canActivate: [authGuard] 
  }, 

  // Redirecciones por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' }
];