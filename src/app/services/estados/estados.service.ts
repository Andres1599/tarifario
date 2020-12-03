import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estados } from 'app/models/estado.model';
import { Respuesta } from 'app/models/respuesta.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Respuesta<Estados[]>> {
    return this.http.get<Respuesta<Estados[]>>(environment.apiBase + '/estado/');
  }

  createEstados(estado: Estados): Observable<Respuesta<Estados>> {
    return this.http.post<Respuesta<Estados>>(environment.apiBase + '/estado/', estado);
  }

  deleteEstados(estado: Estados): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(environment.apiBase + '/estado/' + `${estado.id}`);
  }
}
