import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PartidoService } from '../../services/partido.service';
import { Partido } from '../../models/partido.model';

@Component({
  selector: 'app-formulario-partido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-partido.component.html',
  styleUrls: ['./formulario-partido.component.scss']
})
export class FormularioPartidoComponent {
  
  // Usamos "any" por si tu interface Partido en partido.model.ts aún no tiene el campo "creadorCorreo"
  nuevoPartido: any = {
    titulo: '', 
    lugar: '', 
    fechaHora: '', 
    cuposDisponibles: 10, 
    descripcion: '',
    creadorCorreo: '' // <-- NUEVO: Inicializamos el campo vacío
  };

  canchas: string[] = [
    'El pinal',
    'Parque Carolina',
    'Villas del ensueño',
    'Colvillas',
    'Bellavista',
    'Alto del San José',
    'San Juan',
    'Parque infantil',
    'Los giraldos'
  ];

  constructor(
    private partidoService: PartidoService,
    private router: Router
  ) {}

  guardar() {
    // --- NUEVA LÓGICA: ATRAPAR EL USUARIO LOGUEADO ---
    const userData = localStorage.getItem('usuarioData');
    if (userData) {
      try {
        // Le inyectamos el correo al partido justo antes de enviarlo al backend
        this.nuevoPartido.creadorCorreo = JSON.parse(userData).correo;
      } catch (e) {
        console.error('Error al parsear el usuario del localStorage', e);
      }
    }
    // ---------------------------------------------------

    this.partidoService.crearPartido(this.nuevoPartido).subscribe({
      next: () => {
        alert('Partido creado exitosamente');
        this.router.navigate(['/galeria']); 
      },
      error: (err) => {
        console.error('Error al crear el partido:', err);

        if (err.status === 400 || err.status === 409) {
          alert(`⚠️ Cancha no disponible:\n${err.error.message || 'Ese horario ya está ocupado. Recuerda que cada partido bloquea la cancha por 2 horas.'}`);
        } else {
          alert('Hubo un error al guardar el desafío. Intenta de nuevo.');
        }
      }
    });
  }

  cancelar() {
    this.router.navigate(['/galeria']);
  }
}