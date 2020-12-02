import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'app/models/usuario.model';
import { AuthService } from 'app/services/auth/auth.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { UserService } from 'app/services/user/user.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  usuario: Usuarios;
  usuarioG: Usuarios;

  formUser: FormGroup;

  constructor(
    private authService: AuthService,
    private usuarioService: UserService,
    private notificationService: NotificationsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.usuario = this.authService.getUser();
    this.getUser();
  }

  private initFormUser(usuario: Usuarios): void {
    try {
      this.formUser = this.formBuilder.group({
        id: [usuario.id, Validators.required],
        nombre: [usuario.nombre, Validators.required],
        apellido: [usuario.apellido, Validators.required],
        correo: [usuario.correo, Validators.required],
        estado: [usuario.estado, Validators.required],
        fk_id_tipo_usuario: [usuario.fk_id_tipo_usuario, Validators.required],
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getUser(): void {
    try {
      this.usuarioService.getUser(this.usuario).subscribe(value => {
        if (value.ok) {
          this.usuarioG = value.data[0];
          this.initFormUser(this.usuarioG);
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  updateUser(): void {
    try {
      const usuario: Usuarios = this.formUser.value;
      this.usuarioService.updateUser(usuario).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.update);
          this.getUser();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }



}
