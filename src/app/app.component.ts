import { Component, OnInit } from '@angular/core';
import { PartidoService } from './services/partido.service';
import { Partido } from './models/partido.model';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { FormularioPartidoComponent } from './components/formulario-partido/formulario-partido.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioPartidoComponent], // Importante para usar el *ngFor
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listaPartidos: Partido[] = [];
  mostrarFormulario: boolean = false;

  constructor(private partidoService: PartidoService) {}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  ngOnInit(): void {
    this.cargarPartidos();
  }

  cargarPartidos(): void {
    this.partidoService.getPartidos().subscribe({
      next: (data) => {
        this.listaPartidos = data;
        this.mostrarFormulario = false; // Lo cerramos automáticamente tras crear uno
      },
      error: (err) => console.error('Error al conectar con Spring:', err)
    });
  }
}

