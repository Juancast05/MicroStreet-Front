import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroData = {
    nombre: '',
    cedula: '',
    correo: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    console.log('Enviando datos de registro:', this.registroData);
    this.authService.registrar(this.registroData).subscribe({
      next: (res) => {
        alert('¡Registro exitoso! Por favor inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en registro:', err);
        alert(err.error || 'No se pudo completar el registro');
      }
    });
  }
}