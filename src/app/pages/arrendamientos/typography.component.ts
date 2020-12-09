import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdvertenciaDialogoComponent } from 'app/components/advertencia-dialogo/advertencia-dialogo.component';
import { Arrendamientos } from 'app/models/arrendamiento.model';
import { Estados } from 'app/models/estado.model';
import { ArrendamientosService } from 'app/services/arrendamientos/arrendamientos.service';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  dataSourceArrendamientos: MatTableDataSource<Arrendamientos>;
  displayedColumns: string[] = ['fk_id_proveedor', 'fecha_inicio', 'fecha_fin', 'total', 'fk_id_estado', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private dialogService: DialogosService,
    private arrendamientoService: ArrendamientosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getArrendamietos();
  }

  private getArrendamietos(): void {
    try {
      this.arrendamientoService.getArrendamientos().subscribe((value) => {
        if (value.ok) {
          this.dataSourceArrendamientos = new MatTableDataSource<Arrendamientos>(value.data);
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

  updateTable(event: boolean): void {
    try {
      if (event) {
        this.getArrendamietos();
      }
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantClose(arrendamiento: Arrendamientos): void {
    try {
      this.dialogService.shareData = {
        title: 'Arrendamiento',
        message: MESSAGE_ES.warning_arrendamiento_close
      };
      this.dialogService
        .openDialog(AdvertenciaDialogoComponent)
        .beforeClosed()
        .subscribe((value: boolean) => {
          if (value) {
            arrendamiento.fk_id_estado = 2;
            this.updateState(arrendamiento);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private updateState(arrendamiento: Arrendamientos): void {
    try {
      this.arrendamientoService.updateStateArrendamientos(arrendamiento).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.update);
          this.getArrendamietos();
        }
      })
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

}
