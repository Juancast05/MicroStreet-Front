import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
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

  codigoEnviado = false; // Controla si mostramos el form o la verificación
  codigoIngresado = '';  // Guarda lo que el usuario escribe del correo

  constructor(private http: HttpClient) {}

  registrar() {
    this.http.post('http://localhost:8080/api/auth/registro', this.usuario, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          console.log('Registro exitoso, esperando código:', res);
          this.codigoEnviado = true;
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar: ' + (err.error || 'Inténtalo de nuevo'));
        }
      });
  }

  verificarCodigo() {
    const datosVerificacion = {
      email: this.usuario.email,
      codigo: this.codigoIngresado
    };

    this.http.post('http://localhost:8080/api/auth/verificar', datosVerificacion, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          alert('¡Genial! Cuenta activada con éxito.');
          // Aquí puedes redirigir a la galería:
          window.location.href = '/'; 
        },
        error: (err) => {
          alert('El código no es correcto. Revisa tu correo.');
        }
      });
  }
}