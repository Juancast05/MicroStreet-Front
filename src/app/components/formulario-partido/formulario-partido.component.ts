import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importación necesaria
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
  
  nuevoPartido: Partido = {
    titulo: '', 
    lugar: '', 
    fechaHora: '', 
    cuposDisponibles: 10, 
    descripcion: ''
  };

  // Inyectamos el Router para poder salir de la vista al terminar
  constructor(
    private partidoService: PartidoService,
    private router: Router
  ) {}

  guardar() {
    this.partidoService.crearPartido(this.nuevoPartido).subscribe({
      next: () => {
        alert('¡Desafío creado con éxito!');
        // En lugar de emitir un evento, navegamos al inicio
        this.router.navigate(['/galeria']); 
      },
      error: (err) => {
        console.error('Error al crear el partido:', err);
        alert('Hubo un error al guardar el desafío.');
      }
    });
  }

  cancelar() {
    // Función para el botón de "Cancelar" o "Volver"
    this.router.navigate(['/galeria']);
  }
}