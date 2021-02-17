import { Component, EventEmitter, Inject, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Materiales } from 'app/models/material.model';
import { MaterialesTienda } from 'app/models/material.tienda.model';
import { Monedas } from 'app/models/moneda.model';
import { Tiendas } from 'app/models/tienda.model';
import { MaterialesService } from 'app/services/materiales/materiales.service';
import { MonedasService } from 'app/services/monedas/monedas.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { TiendasService } from 'app/services/tiendas/tiendas.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-material-tienda-dialogo',
  templateUrl: './material-tienda-dialogo.component.html',
  styleUrls: ['./material-tienda-dialogo.component.css']
})
export class MaterialTiendaDialogoComponent implements OnInit {

  formMaterialTienda: FormGroup;
  materiales: Materiales[] = [];
  monedas: Monedas[] = [];
  tiendas: Tiendas[] = [];

  constructor(
    public dialogRef: MatDialogRef<MaterialTiendaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialesTienda,
    private notificationService: NotificationsService,
    private materialService: MaterialesService,
    private tiendaService: TiendasService,
    private monedaService: MonedasService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
    this.getTiendas();
    this.getMateriales();
    this.getMonedas();
  }

  private initFormGroup(): void {
    try {
      this.formMaterialTienda = this.formBuilder.group({
        id: [this.data?.id ? this.data?.id : 0, Validators.required],
        url_imagen: ['...', Validators.required],
        dimension: [this.data?.dimension, Validators.required],
        cantidad: [this.data?.cantidad, Validators.required],
        maximo: [this.data?.maximo, Validators.required],
        precio: [this.data?.precio, Validators.required],
        fk_id_moneda: [this.data?.fk_id_moneda, Validators.required],
        fk_id_material: [this.data?.fk_id_material, Validators.required],
        fk_id_tienda: [this.data?.fk_id_tienda, Validators.required]
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getMonedas(): void {
    try {
      this.monedaService.getMonedas().subscribe(value => {
        if (value.ok) {
          this.monedas = value.data;
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }
  private getMateriales(): void {
    try {
      this.materialService.getMateriales().subscribe(value => {
        if (value.ok) {
          this.materiales = value.data;
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }
  private getTiendas(): void {
    try {
      this.tiendaService.getTiendas().subscribe(value => {
        if (value.ok) {
          this.tiendas = value.data;
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
