import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Respuesta } from 'app/models/respuesta.model';
import { Usuarios } from 'app/models/usuario.model';
import { AuthService } from 'app/services/auth/auth.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUserLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formUserLogin = this.formBuilder.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  LogIn() {
    try {
      const usuario: Usuarios = this.formUserLogin.value;
      this.authService.login(usuario).subscribe((value: Respuesta<{ token: string; expiresIn: string; usuario: Usuarios; }>) => {
        if (value.ok) {
          this.authService.setLogin(value);
        } else {
          this.notificationService.showErrorNotification(MESSAGE_ES.errorLogIn);
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
