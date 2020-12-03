import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoUsuarios } from 'app/models/tipo.usuario.model';
import { Usuarios } from 'app/models/usuario.model';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { UserService } from 'app/services/user/user.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-usuarios-dialogo',
  templateUrl: './usuarios-dialogo.component.html',
  styleUrls: ['./usuarios-dialogo.component.css']
})
export class UsuariosDialogoComponent implements OnInit {

  formUsuario: FormGroup;
  typeUsuers: TipoUsuarios[];

  constructor(
    public dialogRef: MatDialogRef<UsuariosDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios,
    private notificationService: NotificationsService,
    private formBuilder: FormBuilder,
    private usuariosService: UserService
  ) { }

  ngOnInit(): void {
    this.initFormControl();
    this.getTypeUsers();
  }

  initFormControl(): void {
    try {
      this.formUsuario = this.formBuilder.group({
        id: [this.data?.id ? this.data?.id : 0, Validators.required],
        nombre: [this.data?.nombre, Validators.required],
        apellido: [this.data?.apellido, Validators.required],
        correo: [this.data?.correo, Validators.required],
        estado: [true, Validators.required],
        fk_id_tipo_usuario: [this.data?.fk_id_tipo_usuario, Validators.required],
        password: [{ value: '', disabled: (this.data?.password ? true : false), }, Validators.required]
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getTypeUsers(): void {
    try {

      this.usuariosService.getTypeUsers().subscribe(value => {
        if (value.ok) {
          this.typeUsuers = value.data;
        }
      });

    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
