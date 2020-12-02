import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from 'app/models/respuesta.model';
import { Usuarios } from 'app/models/usuario.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Respuesta<Usuarios[]>> {
    return this.http.get<Respuesta<Usuarios[]>>(environment.apiBase + '/usuario/')
  }

  getUser(usuario: Usuarios): Observable<Respuesta<Usuarios[]>> {
    return this.http.get<Respuesta<Usuarios[]>>(environment.apiBase + '/usuario/' + `${usuario.id}`)
  }

  updateUser(usuario: Usuarios): Observable<Respuesta<boolean>> {
    return this.http.put<Respuesta<boolean>>(environment.apiBase + '/usuario/', usuario.id)
  }

  createUser(usuario: Usuarios): Observable<Respuesta<Usuarios[]>> {
    return this.http.post<Respuesta<Usuarios[]>>(environment.apiBase + '/usuario/', usuario.id)
  }

  deleteUser(usuario: Usuarios): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(environment.apiBase + '/usuario/' + `${usuario.id}`)
  }
}
