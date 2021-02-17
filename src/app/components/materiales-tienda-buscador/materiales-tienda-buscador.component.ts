import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialesTienda } from 'app/models/material.tienda.model';
import { MaterialesService } from 'app/services/materiales/materiales.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-materiales-tienda-buscador',
  templateUrl: './materiales-tienda-buscador.component.html',
  styleUrls: ['./materiales-tienda-buscador.component.css']
})
export class MaterialesTiendaBuscadorComponent implements OnInit {

  dataSourceMaterialesTienda: MatTableDataSource<MaterialesTienda>;
  // 'url_imagen' agregar en caso de necesitar visualizar una imagen en la lista
  displayedColumns: string[] = ['fk_id_material', 'dimension', 'cantidad', 'precio', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  materialesTienda: MaterialesTienda[] = [];

  constructor(
    public dialogRef: MatDialogRef<MaterialesTiendaBuscadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private notificationService: NotificationsService,
    private materialesService: MaterialesService,
  ) { }

  ngOnInit(): void {
    this.getMaterialesTienda();
  }

  private getMaterialesTienda(): void {
    try {
      console.log(this.data);
      this.materialesService.getMaterialesTienda({ id: this.data }).subscribe((value) => {
        if (value.ok) {
          this.materialesTienda = value.data;
          this.dataSourceMaterialesTienda = new MatTableDataSource<MaterialesTienda>(this.materialesTienda);
          this.dataSourceMaterialesTienda.paginator = this.paginator;
          this.dataSourceMaterialesTienda.sort = this.sort;
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
