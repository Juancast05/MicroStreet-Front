import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {
  listaPartidos: any[] = [];
  usuarioActual: string = ''; // Aquí guardaremos el correo del usuario activo

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarPartidos();

    // Corregido: Sacamos la lectura del localStorage de la nada y la pusimos en el OnInit
    const userData = localStorage.getItem('usuarioData');
    if (userData) {
      try {
        // Parseamos el JSON para extraer el correo del usuario logueado
        this.usuarioActual = JSON.parse(userData).correo;
      } catch (e) {
        console.error('Error al parsear usuarioData de localStorage', e);
      }
    }
  }

  // Trae los partidos desde tu Backend en Java
  cargarPartidos() {
    this.http.get<any[]>('http://localhost:8080/api/partidos')
      .subscribe({
        next: (data) => {
          this.listaPartidos = data;
        },
        error: (err) => console.error('Error al cargar partidos:', err)
      });
  }

  // Lógica para unirse a un desafío
  unirse(id: number) {
    console.log('Intentando unirse al partido:', id);
    
    this.http.post(`http://localhost:8080/api/partidos/${id}/unirse`, {})
      .subscribe({
        next: () => {
          this.cargarPartidos(); // Recarga la lista para actualizar cupos
        },
        error: (err) => {
          console.warn('Backend sin ruta /unirse, actualizando localmente para pruebas');
          const partido = this.listaPartidos.find(p => p.id === id);
          if (partido && partido.cuposDisponibles > 0) {
            partido.cuposDisponibles--;
          }
        }
      });
  }

  // NUEVA FUNCIÓN: Lógica para evaluar si el usuario actual es el dueño del partido
  esElCreador(partido: any): boolean {
    // Nota: Tu backend de Java debe retornar quién creó el partido (ej: partido.creadorCorreo)
    return partido && partido.creadorCorreo === this.usuarioActual;
  }

  // NUEVA FUNCIÓN: Permite al creador tumbar el partido
  cancelarDesafio(id: number) {
    const confirmar = confirm('¿Estás seguro de que deseas cancelar este partido? Esta acción no se puede deshacer.');
    
    if (confirmar) {
      this.http.delete(`http://localhost:8080/api/partidos/${id}`)
        .subscribe({
          next: () => {
            alert('Partido cancelado exitosamente.');
            // Lo quitamos de la lista visual sin necesidad de recargar toda la página
            this.listaPartidos = this.listaPartidos.filter(p => p.id !== id);
          },
          error: (err) => {
            console.error('Error al cancelar el partido en el backend:', err);
            alert('Hubo un error al intentar cancelar el desafío.');
          }
        });
    }
  }
}