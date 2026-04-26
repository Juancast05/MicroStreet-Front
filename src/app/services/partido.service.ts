import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partido } from '../models/partido.model';

@Injectable({
  providedIn: 'root'
})

export class PartidoService {

  private apiUrl = 'http://localhost:8080/api/partidos';

  constructor(private http: HttpClient) { }

  getPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.apiUrl);
  }

  // Asegúrate de que este método esté DENTRO de las llaves de la clase
  crearPartido(partido: Partido): Observable<Partido> {
    return this.http.post<Partido>(this.apiUrl, partido);
  }

}
