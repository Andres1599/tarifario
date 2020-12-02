import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedores } from 'app/models/proveedor.model';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { ProveedoresService } from 'app/services/proveedores/proveedores.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  dataSourceProveedores: MatTableDataSource<Proveedores>;
  displayedColumns: string[] =  ['id', 'proveedor', 'estado', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private proveedorService: ProveedoresService
  ) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  private getProveedores(): void {
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

}
