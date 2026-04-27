import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';

  // Paso 1: Enviar datos al Back para crear usuario y mandar correo
  registrar(usuario: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/registro`, usuario, { responseType: 'text' });
  }

  // Paso 2: Enviar el código que el usuario recibió por correo
  verificarCodigo(email: string, codigo: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/verificar`, { email, codigo }, { responseType: 'text' });
  }
}