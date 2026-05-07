import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  estaLogueado: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Escuchamos la "radio" del servicio. 
    // Cada vez que el AuthService emita un cambio (login o logout), 
    // esta variable se actualizará sola e instantáneamente.
    this.authService.isLoggedIn$.subscribe(status => {
      this.estaLogueado = status;
    });
  }

  cerrarSesion() {
    // Usamos el método centralizado del servicio
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}