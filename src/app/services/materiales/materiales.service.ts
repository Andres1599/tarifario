import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from 'app/models/respuesta.model';
import { TipoMateriales } from 'app/models/tipo.material.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  constructor(private http: HttpClient) { }

  getTipoMaterial(): Observable<Respuesta<TipoMateriales[]>> {
    return this.http.get<Respuesta<TipoMateriales[]>>(environment.apiBase + '/tipo/material/');
  }

  createTipoMaterial(tipoMaterial: TipoMateriales): Observable<Respuesta<TipoMateriales>> {
    return this.http.post<Respuesta<TipoMateriales>>(environment.apiBase + '/tipo/material/', tipoMaterial);
  }

  deleteTipoMaterial(tipoMaterial: TipoMateriales): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(environment.apiBase + '/tipo/material/' + `${tipoMaterial.id}`);
  }
}
