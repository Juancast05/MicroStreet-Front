import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Partido } from '../models/partido.model';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/partidos';

  getPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.apiUrl);
  }
  
  crearPartido(partido: Partido): Observable<Partido> {
    return this.http.post<Partido>(this.apiUrl, partido);
  }

  // Ajustado a PUT para que coincida con tu @PutMapping del Back
  unirseAPartido(id: number): Observable<Partido> {
    return this.http.put<Partido>(`${this.apiUrl}/${id}/unirse`, {});
  }
   //Funcion para canclar un partido
  cancelarPartido(idPartido: String | number) {
  return this.http.delete(`${this.apiUrl}/${idPartido}`);
 }

}

