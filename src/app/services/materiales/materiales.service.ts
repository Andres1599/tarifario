import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materiales } from 'app/models/material.model';
import { MaterialesTienda } from 'app/models/material.tienda.model';
import { Respuesta } from 'app/models/respuesta.model';
import { Tiendas } from 'app/models/tienda.model';
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

  getMateriales(): Observable<Respuesta<Materiales[]>> {
    return this.http.get<Respuesta<Materiales[]>>(environment.apiBase + '/material/');
  }

  getAllMaterialesTienda(): Observable<Respuesta<MaterialesTienda[]>> {
    return this.http.get<Respuesta<Materiales[]>>(environment.apiBase + '/material/tienda/');
  }

  getMaterialesTienda(tienda: Tiendas): Observable<Respuesta<MaterialesTienda[]>> {
    return this.http.get<Respuesta<Materiales[]>>(environment.apiBase + '/material/tienda/' + `${tienda.id}`);
  }

  createTipoMaterial(tipoMaterial: TipoMateriales): Observable<Respuesta<TipoMateriales>> {
    return this.http.post<Respuesta<TipoMateriales>>(environment.apiBase + '/tipo/material/', tipoMaterial);
  }

  createMateriales(material: Materiales): Observable<Respuesta<Materiales>> {
    return this.http.post<Respuesta<Materiales>>(environment.apiBase + '/material/', material);
  }

  createMaterialesTienda(materialTienda: MaterialesTienda): Observable<Respuesta<Materiales>> {
    return this.http.post<Respuesta<Materiales>>(environment.apiBase + '/material/tienda/', materialTienda);
  }

  deleteTipoMaterial(tipoMaterial: TipoMateriales): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(environment.apiBase + '/tipo/material/' + `${tipoMaterial.id}`);
  }

  deleteMateriales(material: Materiales): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(environment.apiBase + '/material/' + `${material.id}`);
  }

  deleteMaterialesTienda(materialTienda: MaterialesTienda): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(environment.apiBase + '/material/tienda/' + `${materialTienda.id}`);
  }

  updateMateriales(material: Materiales): Observable<Respuesta<boolean>> {
    return this.http.put<Respuesta<boolean>>(environment.apiBase + '/material/', material);
  }

  updateMaterialesTienda(materialTienda: MaterialesTienda): Observable<Respuesta<boolean>> {
    return this.http.put<Respuesta<boolean>>(environment.apiBase + '/material/tienda/', materialTienda);
  }
}
