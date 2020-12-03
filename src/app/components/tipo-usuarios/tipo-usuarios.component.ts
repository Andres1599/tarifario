import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoUsuarios } from 'app/models/tipo.usuario.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { UserService } from 'app/services/user/user.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { AdvertenciaDialogoComponent } from '../advertencia-dialogo/advertencia-dialogo.component';
import { TipoUsuariosDialogoComponent } from '../tipo-usuarios-dialogo/tipo-usuarios-dialogo.component';

@Component({
  selector: 'app-tipo-usuarios',
  templateUrl: './tipo-usuarios.component.html',
  styleUrls: ['./tipo-usuarios.component.css']
})
export class TipoUsuariosComponent implements OnInit {

  dataSourceTipoUsuarios: MatTableDataSource<TipoUsuarios>;
  displayedColumns: string[] = ['id', 'tipo', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
    private TipoUsuariosService: UserService
  ) { }

  ngOnInit(): void {
    this.getTipoUsuarios();
  }

  public getTipoUsuarios(): void {
    try {
      this.TipoUsuariosService.getTypeUsers().subscribe(value => {
        if (value.ok) {
          this.dataSourceTipoUsuarios = new MatTableDataSource<TipoUsuarios>(value.data);
          this.dataSourceTipoUsuarios.paginator = this.paginator;
          this.dataSourceTipoUsuarios.sort = this.sort;
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private newUsuario(Usuario: TipoUsuarios): void {
    try {
      this.TipoUsuariosService.createTypeUser(Usuario).subscribe(value => {
        console.log(value);
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.getTipoUsuarios();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private deleteUsuario(Usuario: TipoUsuarios): void {
    try {
      this.TipoUsuariosService.deleteTypeUser(Usuario).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.delete);
          this.getTipoUsuarios();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantCreate(): void {
    try {
      this.dialogosService.shareData = { id: 0, tipo: '' };
      this.dialogosService
        .openDialog(TipoUsuariosDialogoComponent)
        .beforeClosed()
        .subscribe((value: TipoUsuarios) => {
          if (value) {
            this.newUsuario(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantDelete(Usuario: TipoUsuarios): void {
    try {
      this.dialogosService.shareData = {
        title: 'Tipo de Usuario',
        message: MESSAGE_ES.warning_tipo_usuarios
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
