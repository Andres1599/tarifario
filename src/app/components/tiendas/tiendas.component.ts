import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tiendas } from 'app/models/tienda.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { TiendasService } from 'app/services/tiendas/tiendas.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { AdvertenciaDialogoComponent } from '../advertencia-dialogo/advertencia-dialogo.component';
import { TiendasDialogoComponent } from '../tiendas-dialogo/tiendas-dialogo.component';

@Component({
  selector: 'app-tiendas-table',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasTableComponent implements OnInit {

  dataSourceTiendas: MatTableDataSource<Tiendas>;
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tiendaSelected: EventEmitter<Tiendas> = new EventEmitter<Tiendas>();

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
    private tiendaService: TiendasService
  ) { }

  ngOnInit(): void {
    this.getTiendas();
  }

  public getTiendas(): void {
    try {
      this.tiendaService.getTiendas().subscribe(value => {
        if (value.ok) {
          this.dataSourceTiendas = new MatTableDataSource<Tiendas>(value.data);
          this.dataSourceTiendas.paginator = this.paginator;
          this.dataSourceTiendas.sort = this.sort;
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private newTienda(tienda: Tiendas): void {
    try {
      this.tiendaService.createTiendas(tienda).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.getTiendas();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private updateTienda(tienda: Tiendas): void {
    try {
      this.tiendaService.updateTiendas(tienda).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.update);
          this.getTiendas();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private deletetienda(tienda: Tiendas): void {
    try {
      this.tiendaService.deleteTiendas(tienda).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.delete);
          this.getTiendas();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantCreate(): void {
    try {
      this.dialogosService.shareData = { id: 0, codigo: '', nombre: '' };
      this.dialogosService
        .openDialog(TiendasDialogoComponent)
        .beforeClosed()
        .subscribe((value: Tiendas) => {
          if (value) {
            this.newTienda(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantUpdate(tienda: Tiendas): void {
    try {
      this.dialogosService.shareData = tienda;
      this.dialogosService
        .openDialog(TiendasDialogoComponent)
        .beforeClosed()
        .subscribe((value: Tiendas) => {
          if (value) {
            this.updateTienda(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantDelete(tienda: Tiendas): void {
    try {
      this.dialogosService.shareData = {
        title: 'Tiendas',
        message: MESSAGE_ES.warning_tiendas
      };
      this.dialogosService
        .openDialog(AdvertenciaDialogoComponent)
        .beforeClosed()
        .subscribe((value: boolean) => {
          if (value) {
            this.deletetienda(tienda);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  emitTiendaSelected(tienda: Tiendas): void {
    this.tiendaSelected.emit(tienda);
  }

}
