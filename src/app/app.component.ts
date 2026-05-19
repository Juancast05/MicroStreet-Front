import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  estaLogueado: boolean = false;
  rutaActual: string = ''; // Guardaremos la ruta aquí

  constructor(private authService: AuthService, private router: Router) {
    // Escuchamos la ruta para saber exactamente en qué página estamos
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.rutaActual = event.urlAfterRedirects || event.url;
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.estaLogueado = status;
    });
  }

  //  Esta función decide si mostrar la barra completa
  get mostrarNav(): boolean {
    // Muestra la nav SOLO si está logueado Y NO está en login ni en registro
    return this.estaLogueado && !this.rutaActual.includes('/login') && !this.rutaActual.includes('/registro');
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}