import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TiendasTableComponent } from 'app/components/tiendas/tiendas.component';
import { Arrendamientos } from 'app/models/arrendamiento.model';
import { Estados } from 'app/models/estado.model';
import { MaterialesTienda } from 'app/models/material.tienda.model';
import { Tiendas } from 'app/models/tienda.model';
import { ArrendamientosService } from 'app/services/arrendamientos/arrendamientos.service';
import { MaterialesService } from 'app/services/materiales/materiales.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  materialesTiendaSelect: MaterialesTienda[] = [];
  currenTienda: Tiendas;

  @ViewChild('tiendas') tiendaTable: TiendasTableComponent;

  dataSourceArrendamientos: MatTableDataSource<Arrendamientos>;
  displayedColumns: string[] = ['fk_id_proveedor', 'fecha_inicio', 'fecha_fin', 'total', 'fk_id_estado', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private materialService: MaterialesService,
    private arrendamientoService: ArrendamientosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  tiendaSelected(event: Tiendas): void {
    try {
      this.currenTienda = event;
      this.materialService.getMaterialesTienda(this.currenTienda).subscribe(value => {
        if (value.ok) {
          this.materialesTiendaSelect = value.data;
          this.getArrendamiento(this.currenTienda.id);
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  createMaterialTienda(event: MaterialesTienda): void {
    try {
      this.materialService.createMaterialesTienda(event).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.tiendaSelected(this.currenTienda);
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  updateMaterialTienda(event: MaterialesTienda): void {
    try {
      this.materialService.updateMaterialesTienda(event).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.update);
          this.tiendaSelected(this.currenTienda);
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  deleteMaterialTienda(event: MaterialesTienda): void {
    try {
      this.materialService.deleteMaterialesTienda(event).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.delete);
          this.tiendaSelected(this.currenTienda);
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantPrint(arrendamiento: Arrendamientos): void {
    try {
      this.router.navigateByUrl('/arrendamiento/' + `${arrendamiento.id}`);
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getArrendamiento(idTienda: number): void {
    try {
      this.arrendamientoService.getArrendamientosByTienda(idTienda).subscribe(value => {
        if (value.ok) {
          const data = value.data.filter(arrendamiento => arrendamiento.arrendamientos_materiales.length > 0)
          this.dataSourceArrendamientos = new MatTableDataSource<Arrendamientos>(data);
          this.dataSourceArrendamientos.paginator = this.paginator;
          this.dataSourceArrendamientos.sort = this.sort;
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  semaforo(element: Estados): string {
    try {
      if (element.estado === "Activo") {
        return '#adce74';
      } else if (element.estado === "Cancelado") {
        return '#d35d6e';
      } else if (element.estado === "Presupuestado") {
        return '#fff76a';
      } else if (element.estado === "Cerrado") {
        return '#d35d6e';
      }
    } catch (error) {
      return '';
    }
  }

}
