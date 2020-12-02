import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Materiales } from 'app/models/material.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { MaterialesService } from 'app/services/materiales/materiales.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { AdvertenciaDialogoComponent } from '../advertencia-dialogo/advertencia-dialogo.component';
import { MaterialesDialogoComponent } from '../materiales-dialogo/materiales-dialogo.component';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

  dataSourceMateriales: MatTableDataSource<Materiales>;
  displayedColumns: string[] = ['id', 'material', 'fk_id_tipo_material', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
    private materialesService: MaterialesService
  ) { }

  ngOnInit(): void {
    this.getMateriales();
  }

  public getMateriales(): void {
    try {
      this.materialesService.getMateriales().subscribe(value => {
        if (value.ok) {
          this.dataSourceMateriales = new MatTableDataSource<Materiales>(value.data);
          this.dataSourceMateriales.paginator = this.paginator;
          this.dataSourceMateriales.sort = this.sort;
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private newMaterial(Material: Materiales): void {
    try {
      this.materialesService.createMateriales(Material).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.getMateriales();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private updateMaterial(Material: Materiales): void {
    try {
      this.materialesService.updateMateriales(Material).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.update);
          this.getMateriales();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private deleteMaterial(Material: Materiales): void {
    try {
      this.materialesService.deleteMateriales(Material).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.delete);
          this.getMateriales();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantCreate(): void {
    try {
      this.dialogosService.shareData = { id: 0, material: '', fk_id_tipo_material: 0 };
      this.dialogosService
        .openDialog(MaterialesDialogoComponent)
        .beforeClosed()
        .subscribe((value: Materiales) => {
          if (value) {
            this.newMaterial(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantUpdate(material: Materiales): void {
    try {
      this.dialogosService.shareData = material;
      this.dialogosService
        .openDialog(MaterialesDialogoComponent)
        .beforeClosed()
        .subscribe((value: Materiales) => {
          if (value) {
            this.updateMaterial(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantDelete(material: Materiales): void {
    try {
      this.dialogosService.shareData = {
        title: 'Materiales',
        message: MESSAGE_ES.warning_material
      };
      this.dialogosService
        .openDialog(AdvertenciaDialogoComponent)
        .beforeClosed()
        .subscribe((value: boolean) => {
          if (value) {
            this.deleteMaterial(material);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }
}
