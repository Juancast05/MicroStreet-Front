// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  // 1. Iniciamos el estado según lo que haya en el localStorage
  private isLoggedInSubject = new BehaviorSubject<boolean>(localStorage.getItem('usuarioLogueado') === 'true');
  
  // 2. Este es el observable que escuchará el AppComponent
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' }).pipe(
      tap(() => {
        // 3. Si el login es exitoso, actualizamos el "emisor" de señal
        localStorage.setItem('usuarioLogueado', 'true');
        this.isLoggedInSubject.next(true);
      })
    );
  }

  // 4. Nuevo método para registrarse
  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario, { responseType: 'text' });
  }

  // 5. Método para avisar a todos que la sesión se cerró
  logout() {
    localStorage.removeItem('usuarioLogueado');
    this.isLoggedInSubject.next(false);
  }
}