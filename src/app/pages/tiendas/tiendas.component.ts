import { Component, OnInit, ViewChild } from '@angular/core';
import { TiendasTableComponent } from 'app/components/tiendas/tiendas.component';
import { MaterialesTienda } from 'app/models/material.tienda.model';
import { Tiendas } from 'app/models/tienda.model';
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

  constructor(
    private notificationService: NotificationsService,
    private materialService: MaterialesService,
  ) { }

  ngOnInit(): void {
  }

  tiendaSelected(event: Tiendas): void {
    try {
      this.currenTienda = event;
      this.materialService.getMaterialesTienda(this.currenTienda).subscribe(value => {
        if (value.ok) {
          this.materialesTiendaSelect = value.data;
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

}
