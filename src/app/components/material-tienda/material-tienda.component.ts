import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialesTienda } from 'app/models/material.tienda.model';
import { Tiendas } from 'app/models/tienda.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { AdvertenciaDialogoComponent } from '../advertencia-dialogo/advertencia-dialogo.component';
import { MaterialTiendaDialogoComponent } from '../material-tienda-dialogo/material-tienda-dialogo.component';

@Component({
  selector: 'app-material-tienda',
  templateUrl: './material-tienda.component.html',
  styleUrls: ['./material-tienda.component.css']
})
export class MaterialTiendaComponent implements OnInit, OnChanges {

  tienda: Tiendas;

  dataSourceMaterialesTienda: MatTableDataSource<MaterialesTienda>;
  // 'url_imagen' agregar en caso de necesitar visualizar una imagen en la lista
  displayedColumns: string[] = ['fk_id_material', 'dimension', 'cantidad', 'precio', 'fk_id_tienda', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() materialesTienda: MaterialesTienda[] = [];
  @Input() currentTienda: Tiendas = {};

  @Output() materialTiendaUpdate: EventEmitter<MaterialesTienda> = new EventEmitter<MaterialesTienda>();
  @Output() materialTiendaCreate: EventEmitter<MaterialesTienda> = new EventEmitter<MaterialesTienda>();
  @Output() materialTiendaDelete: EventEmitter<MaterialesTienda> = new EventEmitter<MaterialesTienda>();

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['materialesTienda'].isFirstChange()) {
      this.getMaterialesTienda(this.materialesTienda);
    }
  }

  private getMaterialesTienda(materialTienda: MaterialesTienda[]): void {
    try {
      this.dataSourceMaterialesTienda = new MatTableDataSource<MaterialesTienda>(materialTienda);
      this.dataSourceMaterialesTienda.paginator = this.paginator;
      this.dataSourceMaterialesTienda.sort = this.sort;
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantCreate(): void {
    try {
      this.dialogosService.shareData = {};
      this.dialogosService
        .openDialog(MaterialTiendaDialogoComponent)
        .beforeClosed()
        .subscribe((value: MaterialesTienda) => {
          if (value) {
            this.materialTiendaCreate.emit(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantUpdate(materialTienda: MaterialesTienda): void {
    try {
      this.dialogosService.shareData = materialTienda;
      this.dialogosService
        .openDialog(MaterialTiendaDialogoComponent)
        .beforeClosed()
        .subscribe((value: MaterialesTienda) => {
          if (value) {
            this.materialTiendaUpdate.emit(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantDelete(materialTienda: MaterialesTienda): void {
    try {
      this.dialogosService.shareData = {
        title: 'Material de tienda',
        message: MESSAGE_ES.warning_material
      };
      this.dialogosService
        .openDialog(AdvertenciaDialogoComponent)
        .beforeClosed()
        .subscribe((value: boolean) => {
          if (value) {
            this.materialTiendaDelete.emit(materialTienda);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }
}
