import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Limpiamos las importaciones
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData = { email: '', password: '' }; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        // El AuthService ya hace el setItem y emite la señal, 
        // así que solo nos queda navegar.
        this.router.navigate(['/galeria']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        // Manejo de error si el backend devuelve un objeto o un texto
        const errorMsg = typeof err.error === 'string' ? err.error : 'Credenciales incorrectas';
        alert(errorMsg);
      }
    });
  }
}