import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedores } from 'app/models/proveedor.model';
import { Respuesta } from 'app/models/respuesta.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(
    private http: HttpClient
  ) { }

  getProveedores(): Observable<Respuesta<Proveedores[]>> {
    return this.http.get<Respuesta<Proveedores[]>>(environment.apiBase + '/proveedor/');
  }

  createProveedores(proveedor: Proveedores): Observable<Respuesta<Proveedores>> {
    return this.http.post<Respuesta<Proveedores>>(environment.apiBase + '/proveedor/', proveedor);
  }

  updateProveedores(proveedor: Proveedores): Observable<Respuesta<boolean>> {
    return this.http.post<Respuesta<boolean>>(environment.apiBase + '/proveedor/', proveedor);
  }

  deleteProveedores(proveedor: Proveedores): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(environment.apiBase + '/proveedor/' + `${proveedor.id}`);
  }
}
