import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component'; // Verifica que la ruta sea correcta
// Importa también el componente donde tienes la galería (ej: GaleriaComponent)

export const routes: Routes = [
  { 
    path: 'registro', 
    component: RegistroComponent 
  },
  { 
    path: '**', 
    redirectTo: '' 
  } // Redirige cualquier ruta rara al inicio
];