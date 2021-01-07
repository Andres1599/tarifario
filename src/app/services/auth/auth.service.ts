import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Respuesta } from 'app/models/respuesta.model';
import { Usuarios } from 'app/models/usuario.model';
import { MESSAGE_ES } from 'app/utils/messages';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = environment.token;
  private expired = environment.expired;
  private user = environment.user;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationsService,
  ) { }

  login(usuario: Usuarios): Observable<Respuesta<{ token: string; expiresIn: string; usuario: Usuarios; }>> {
    return this.http.post<Respuesta<{ token: string; expiresIn: string; usuario: Usuarios; }>>(environment.apiBase + '/login/', usuario)
  }

  setLogin(respuesta: Respuesta<{ token: string; expiresIn: string; usuario: Usuarios; }>): void {
    try {
      const expiresAt = moment().add(respuesta.data.expiresIn, 'seconds');
      localStorage.setItem(this.token, respuesta.data.token);
      localStorage.setItem(this.expired, JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem(this.user, this.DataEncode(JSON.stringify(respuesta.data.usuario)))
      this.router.navigateByUrl('/profile');
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.errorLogIn);
    }
  }

  logout(): void {
    try {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.errorLogOut);
    }
  }

  geToken(): string {
    try {
      return localStorage.getItem(this.token);
    } catch (error) {
      return null;
    }
  }

  getUser(): Usuarios {
    try {
      return JSON.parse(this.DataDecode(localStorage.getItem(this.user)))
    } catch (error) {
      return null;
    }
  }

  private DataEncode(data: any): string {
    try {
      const encode = btoa(data);
      return encode;
    } catch (error) {
      return null;
    }
  }

  private DataDecode(data: any): any {
    try {
      const dataDecode = atob(data);
      return dataDecode;
    } catch (error) {
      return null;
    }
  }

}