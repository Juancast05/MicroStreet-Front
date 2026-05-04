import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    CommonModule, 
    HttpClientModule, // <-- Importante para peticiones HTTP
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mostrarFormulario = false;
  listaPartidos: any[] = [];

  // Inyectamos el Router para las rutas y el HttpClient para el backend
  constructor(private router: Router, private http: HttpClient) {} 

  // En app.component.ts
esUsuarioLogueado(): boolean {
  return localStorage.getItem('usuarioLogueado') !== null;
}

cerrarSesion() {
  localStorage.removeItem('usuarioLogueado');
  this.router.navigate(['/login']);
}

  ngOnInit() {
    this.cargarPartidos(); // Carga la lista apenas se abre la página
  }

  // Función para saber si estamos en la página de registro
  esRutaPrincipal(): boolean {
  return this.router.url === '/';
}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  // Método para pedir los partidos al Backend
  cargarPartidos() {
    this.http.get<any[]>('http://localhost:8080/api/partidos')
      .subscribe({
        next: (data) => {
          this.listaPartidos = data;
          this.mostrarFormulario = false; // Cierra el formulario si estaba abierto
        },
        error: (err) => console.error('Error al cargar la galería de partidos:', err)
      });
  }

  // Método para unirse y restar cupos
  unirse(id: number) {
    console.log('Uniéndose al partido:', id);
    
    // Petición al backend (asegúrate de crear este endpoint en tu Java luego)
    this.http.post(`http://localhost:8080/api/partidos/${id}/unirse`, {})
      .subscribe({
        next: (res) => {
          // Si el back responde bien, recargamos la lista para traer los cupos actualizados
          this.cargarPartidos();
        },
        error: (err) => {
          console.error('El backend aún no tiene esta ruta, pero actualizamos la vista localmente', err);
          
          // SALVAVIDAS VISUAL: Resta el cupo en la pantalla temporalmente
          const partido = this.listaPartidos.find(p => p.id === id);
          if (partido && partido.cuposDisponibles > 0) {
            partido.cuposDisponibles--;
          }
        }
      });
  }
}