import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'app/models/usuario.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { UserService } from 'app/services/user/user.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { AdvertenciaDialogoComponent } from '../advertencia-dialogo/advertencia-dialogo.component';
import { UsuariosDialogoComponent } from '../usuarios-dialogo/usuarios-dialogo.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  dataSourceUsuarios: MatTableDataSource<Usuarios>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo', 'estado', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
    private usuariosService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  public getUsuarios(): void {
    try {
      this.usuariosService.getUsers().subscribe(value => {
        if (value.ok) {
          this.dataSourceUsuarios = new MatTableDataSource<Usuarios>(value.data);
          this.dataSourceUsuarios.paginator = this.paginator;
          this.dataSourceUsuarios.sort = this.sort;
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private newUsuario(Usuario: Usuarios): void {
    try {
      this.usuariosService.createUser(Usuario).subscribe(value => {
        console.log(value);
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.getUsuarios();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private updateUsuario(Usuario: Usuarios): void {
    try {
      this.usuariosService.updateUser(Usuario).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.update);
          this.getUsuarios();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private deleteUsuario(Usuario: Usuarios): void {
    try {
      this.usuariosService.deleteUser(Usuario).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.delete);
          this.getUsuarios();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantCreate(): void {
    try {
      this.dialogosService.shareData = { id: 0, nombre: '', apellido: '', estado: true, fk_id_tipo_usuario: 0, correo: '', password: '' };
      this.dialogosService
        .openDialog(UsuariosDialogoComponent)
        .beforeClosed()
        .subscribe((value: Usuarios) => {
          if (value) {
            this.newUsuario(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantUpdate(Usuario: Usuarios): void {
    try {
      this.dialogosService.shareData = Usuario;
      this.dialogosService
        .openDialog(UsuariosDialogoComponent)
        .beforeClosed()
        .subscribe((value: Usuarios) => {
          if (value) {
            this.updateUsuario(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantDelete(Usuario: Usuarios): void {
    try {
      this.dialogosService.shareData = {
        title: 'Usuarios',
        message: MESSAGE_ES.warning_usuarios
      };
      this.dialogosService
        .openDialog(AdvertenciaDialogoComponent)
        .beforeClosed()
        .subscribe((value: boolean) => {
          if (value) {
            this.deleteUsuario(Usuario);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }
}
