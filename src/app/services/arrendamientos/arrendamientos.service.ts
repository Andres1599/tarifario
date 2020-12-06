import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
