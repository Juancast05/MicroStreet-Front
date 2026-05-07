import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Importamos Router para la navegación profesional
import { RouterLink } from '@angular/router'; // Para enlaces de navegación

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  // Objeto que coincide con tu entidad Java
  usuario = {
    nombre: '',
    documento: '',
    email: '',
    password: ''
  };

  codigoEnviado = false; 
  enviandoPeticion = false; // Variable para bloquear los botones y evitar saturación
  codigoIngresado = '';  

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    if (this.enviandoPeticion) return; // Si ya hay una petición en curso, no hace nada

    this.enviandoPeticion = true; // Bloquea el botón

    this.http.post('http://localhost:8080/api/auth/registro', this.usuario, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          console.log('Registro exitoso, esperando código:', res);
          this.codigoEnviado = true;
          this.enviandoPeticion = false; // Desbloquea para el siguiente paso
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar: ' + (err.error || 'Inténtalo de nuevo'));
          this.enviandoPeticion = false; // Desbloquea en caso de error para que el usuario corrija
        }
      });
  }

  verificarCodigo() {
    if (this.enviandoPeticion) return;

    this.enviandoPeticion = true;

    const datosVerificacion = {
      email: this.usuario.email,
      codigo: this.codigoIngresado
    };

    this.http.post('http://localhost:8080/api/auth/verificar', datosVerificacion, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          alert('¡Genial! Cuenta activada con éxito.');
          this.enviandoPeticion = false;
          // Redirección profesional sin recargar la página
          this.router.navigate(['/']); 
        },
        error: (err) => {
          alert('El código no es correcto o ha expirado. Revisa tu correo.');
          this.enviandoPeticion = false;
        }
      });
  }
}