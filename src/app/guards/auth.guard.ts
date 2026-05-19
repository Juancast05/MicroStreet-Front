// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const estaLogueado = localStorage.getItem('usuarioLogueado') === 'true';

  if (estaLogueado) {
    return true; // Si está logueado, lo deja pasar sin problemas
  } else {
    console.warn('Acceso denegado. Redirigiendo al login...');
    router.navigate(['/login']); // Si no está logueado, lo expulsa al login
    return false;
  }
};