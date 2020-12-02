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

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationsService,
  ) { }

  login(usuario: Usuarios): Observable<Respuesta<{ token: string; expiresIn: string; }>> {
    return this.http.post<Respuesta<{ token: string; expiresIn: string; }>>(environment.apiBase + '/login/', usuario)
  }

  setLogin(respuesta: Respuesta<{ token: string; expiresIn: string; }>): void {
    try {
      const expiresAt = moment().add(respuesta.data.expiresIn, 'seconds');
      localStorage.setItem(this.token, respuesta.data.token);
      localStorage.setItem(this.expired, JSON.stringify(expiresAt.valueOf()));
      this.router.navigateByUrl('/dashboard');
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

}