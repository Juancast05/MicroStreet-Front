import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-galeria',
  standalone: true,
  // IMPORTANTE: CommonModule permite usar *ngFor y pipes de fecha
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {
  listaPartidos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarPartidos();
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
}