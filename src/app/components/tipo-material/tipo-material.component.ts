import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoMateriales } from 'app/models/tipo.material.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { MaterialesService } from 'app/services/materiales/materiales.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { AdvertenciaDialogoComponent } from '../advertencia-dialogo/advertencia-dialogo.component';
import { TipoMaterialDialogoComponent } from '../tipo-material-dialogo/tipo-material-dialogo.component';

@Component({
  selector: 'app-tipo-material',
  templateUrl: './tipo-material.component.html',
  styleUrls: ['./tipo-material.component.css']
})
export class TipoMaterialComponent implements OnInit {

  dataSourceTipoMateriales: MatTableDataSource<TipoMateriales>;
  displayedColumns: string[] = ['id', 'tipo', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
    private materialesService: MaterialesService
  ) { }

  ngOnInit(): void {
    this.getTipoMateriales();
  }

  public getTipoMateriales(): void {
    try {
      this.materialesService.getTipoMaterial().subscribe(value => {
        if (value.ok) {
          this.dataSourceTipoMateriales = new MatTableDataSource<TipoMateriales>(value.data);
          this.dataSourceTipoMateriales.paginator = this.paginator;
          this.dataSourceTipoMateriales.sort = this.sort;
        }
      })
    } catch (error) {
      console.error(error)
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private newTipoMaterial(tipoMaterial: TipoMateriales): void {
    try {
      this.materialesService.createTipoMaterial(tipoMaterial).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.getTipoMateriales();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private deleteTipoMaterial(tipoMaterial: TipoMateriales): void {
    try {
      this.materialesService.deleteTipoMaterial(tipoMaterial).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.delete);
          this.getTipoMateriales();
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
        .openDialog(TipoMaterialDialogoComponent)
        .beforeClosed()
        .subscribe((value: TipoMateriales) => {
          if (value) {
            this.newTipoMaterial(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantDelete(tipoMaterial: TipoMateriales): void {
    try {
      this.dialogosService.shareData = {
        title: 'Tipo de Materiales',
        message: MESSAGE_ES.warning_proveedor
      };
      this.dialogosService
        .openDialog(AdvertenciaDialogoComponent)
        .beforeClosed()
        .subscribe((value: boolean) => {
          if (value) {
            this.deleteTipoMaterial(tipoMaterial);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }
}
