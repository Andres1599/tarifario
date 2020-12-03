import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Monedas } from 'app/models/moneda.model';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { MonedasService } from 'app/services/monedas/monedas.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { AdvertenciaDialogoComponent } from '../advertencia-dialogo/advertencia-dialogo.component';
import { MonedasDialogoComponent } from '../monedas-dialogo/monedas-dialogo.component';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent implements OnInit {

  dataSourceMonedas: MatTableDataSource<Monedas>;
  displayedColumns: string[] = ['id', 'moneda', 'iso', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notificationService: NotificationsService,
    private dialogosService: DialogosService,
    private Monedaservice: MonedasService
  ) { }

  ngOnInit(): void {
    this.getMonedas();
  }

  public getMonedas(): void {
    try {
      this.Monedaservice.getMonedas().subscribe(value => {
        if (value.ok) {
          this.dataSourceMonedas = new MatTableDataSource<Monedas>(value.data);
          this.dataSourceMonedas.paginator = this.paginator;
          this.dataSourceMonedas.sort = this.sort;
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private newMoneda(moneda: Monedas): void {
    try {
      this.Monedaservice.createMonedas(moneda).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.create);
          this.getMonedas();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private deleteMoneda(moneda: Monedas): void {
    try {
      this.Monedaservice.deleteMonedas(moneda).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.delete);
          this.getMonedas();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantCreate(): void {
    try {
      this.dialogosService.shareData = { id: 0, moneda: '', iso: '' };
      this.dialogosService
        .openDialog(MonedasDialogoComponent)
        .beforeClosed()
        .subscribe((value: Monedas) => {
          if (value) {
            this.newMoneda(value);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  wantDelete(moneda: Monedas): void {
    try {
      this.dialogosService.shareData = {
        title: 'Monedas',
        message: MESSAGE_ES.warning_monedas
      };
      this.dialogosService
        .openDialog(AdvertenciaDialogoComponent)
        .beforeClosed()
        .subscribe((value: boolean) => {
          if (value) {
            this.deleteMoneda(moneda);
          }
        })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }
}
