import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from 'app/models/respuesta.model';
import { Tiendas } from 'app/models/tienda.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  constructor(private http: HttpClient) { }

  getTiendas(): Observable<Respuesta<Tiendas[]>> {
    return this.http.get<Respuesta<Tiendas[]>>(environment.apiBase + '/tienda/');
  }

  createTiendas(tienda: Tiendas): Observable<Respuesta<Tiendas>> {
    return this.http.post<Respuesta<Tiendas>>(environment.apiBase + '/tienda/', tienda);
  }

  updateTiendas(tienda: Tiendas): Observable<Respuesta<boolean>> {
    return this.http.put<Respuesta<boolean>>(environment.apiBase + '/tienda/', tienda);
  }

  deleteTiendas(tienda: Tiendas): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(environment.apiBase + '/tienda/' + `${tienda.id}`);
  }
}
