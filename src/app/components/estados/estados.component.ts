import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Estados } from 'app/models/estado.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { EstadosService } from 'app/services/estados/estados.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { AdvertenciaDialogoComponent } from '../advertencia-dialogo/advertencia-dialogo.component';
import { EstadosDialogoComponent } from '../estados-dialogo/estados-dialogo.component';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  dataSourceEstados: MatTableDataSource<Estados>;
  displayedColumns: string[] = ['id', 'estado', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
    private estadosService: EstadosService
  ) { }

  ngOnInit(): void {
    this.getEstados();
  }

  public getEstados(): void {
    try {
      this.estadosService.getEstados().subscribe(value => {
        if (value.ok) {
          this.dataSourceEstados = new MatTableDataSource<Estados>(value.data);
          this.dataSourceEstados.paginator = this.paginator;
          this.dataSourceEstados.sort = this.sort;
        }
      })
    } catch (error) {
      console.error(error)
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private newEstado(Estado: Estados): void {
    try {
      this.estadosService.createEstados(Estado).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.getEstados();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private deleteEstado(Estado: Estados): void {
    try {
      this.estadosService.deleteEstados(Estado).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.delete);
          this.getEstados();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantCreate(): void {
    try {
      this.dialogosService.shareData = { id: 0, estado: '' };
      this.dialogosService
        .openDialog(EstadosDialogoComponent)
        .beforeClosed()
        .subscribe((value: Estados) => {
          if (value) {
            this.newEstado(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantDelete(Estado: Estados): void {
    try {
      this.dialogosService.shareData = {
        title: 'Estado',
        message: MESSAGE_ES.warning_proveedor
      };
      this.dialogosService
        .openDialog(AdvertenciaDialogoComponent)
        .beforeClosed()
        .subscribe((value: boolean) => {
          if (value) {
            this.deleteEstado(Estado);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }
}
