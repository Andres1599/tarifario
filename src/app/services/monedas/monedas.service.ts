import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Monedas } from 'app/models/moneda.model';
import { Respuesta } from 'app/models/respuesta.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  constructor(private http: HttpClient) { }

  getMonedas(): Observable<Respuesta<Monedas[]>> {
    return this.http.get<Respuesta<Monedas[]>>(environment.apiBase + '/moneda');
  }

  createMonedas(moneda: Monedas): Observable<Respuesta<Monedas>> {
    return this.http.post<Respuesta<Monedas>>(environment.apiBase + '/moneda', moneda);
  }

  deleteMonedas(moneda: Monedas): Observable<Respuesta<boolean>> {
    return this.http.get<Respuesta<boolean>>(environment.apiBase + '/moneda/' + `${moneda.id}`);
  }
}
