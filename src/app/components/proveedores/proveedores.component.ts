import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedores } from 'app/models/proveedor.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { ProveedoresService } from 'app/services/proveedores/proveedores.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { ProveedoresDialogoComponent } from '../proveedores-dialogo/proveedores-dialogo.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  dataSourceProveedores: MatTableDataSource<Proveedores>;
  displayedColumns: string[] = ['id', 'proveedor', 'estado', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
    private proveedorService: ProveedoresService
  ) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  public getProveedores(): void {
    try {
      this.proveedorService.getProveedores().subscribe(value => {
        if (value.ok) {
          this.dataSourceProveedores = new MatTableDataSource<Proveedores>(value.data);
          this.dataSourceProveedores.paginator = this.paginator;
          this.dataSourceProveedores.sort = this.sort;
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private newProveedor(proveedor: Proveedores): void {
    try {
      this.proveedorService.createProveedores(proveedor).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.getProveedores();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantCreate(): void {
    try {
      this.dialogosService.shareData = { id: 0, proveedor: '', estado: true };
      this.dialogosService
        .openDialog(ProveedoresDialogoComponent)
        .beforeClosed()
        .subscribe((value: Proveedores) => {
          if (value) {
            this.newProveedor(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
