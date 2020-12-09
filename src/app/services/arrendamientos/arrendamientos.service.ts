import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArrendamientoMateriales } from 'app/models/arrendamiento.material.model';
import { Arrendamientos } from 'app/models/arrendamiento.model';
import { Respuesta } from 'app/models/respuesta.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrendamientosService {

  constructor(private http: HttpClient) { }

  getArrendamientos(): Observable<Respuesta<Arrendamientos[]>> {
    return this.http.get<Respuesta<Arrendamientos[]>>(environment.apiBase + '/arrendamiento/');
  }

  getArrendamientosById(idArrendamiento: number): Observable<Respuesta<Arrendamientos>> {
    return this.http.get<Respuesta<Arrendamientos>>(environment.apiBase + '/arrendamiento/' + `${idArrendamiento}`);
  }

  createArrendamientos(arrendamiento: Arrendamientos, arrendamientoMaterial: ArrendamientoMateriales[]): Observable<Respuesta<Arrendamientos>> {
    return this.http.post<Respuesta<Arrendamientos>>(environment.apiBase + '/arrendamiento/', { arrendamiento, materiales: arrendamientoMaterial });
  }

  updateStateArrendamientos(arrendamiento: Arrendamientos): Observable<Respuesta<Arrendamientos>> {
    return this.http.put<Respuesta<Arrendamientos>>(environment.apiBase + '/arrendamiento/', arrendamiento);
  }

}
