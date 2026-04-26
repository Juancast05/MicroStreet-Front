import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  // El Output sirve para avisarle al padre (app.component) que refresque la lista
  @Output() partidoCreado = new EventEmitter<void>();

  nuevoPartido: Partido = {
    titulo: '', lugar: '', fechaHora: '', cuposDisponibles: 10, descripcion: ''
  };

  constructor(private partidoService: PartidoService) {}

  guardar() {
    this.partidoService.crearPartido(this.nuevoPartido).subscribe({
      next: () => {
        this.partidoCreado.emit(); // Avisamos que terminamos
        this.limpiarForm();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  private limpiarForm() {
    this.nuevoPartido = { titulo: '', lugar: '', fechaHora: '', cuposDisponibles: 10, descripcion: '' };
  }
}