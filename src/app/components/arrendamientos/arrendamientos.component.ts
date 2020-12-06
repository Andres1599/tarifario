import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estados } from 'app/models/estado.model';
import { MaterialesTienda } from 'app/models/material.tienda.model';
import { Monedas } from 'app/models/moneda.model';
import { Proveedores } from 'app/models/proveedor.model';
import { Usuarios } from 'app/models/usuario.model';
import { AuthService } from 'app/services/auth/auth.service';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { EstadosService } from 'app/services/estados/estados.service';
import { MonedasService } from 'app/services/monedas/monedas.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { ProveedoresService } from 'app/services/proveedores/proveedores.service';
import { MESSAGE_ES } from 'app/utils/messages';
import { MaterialesTiendaBuscadorComponent } from '../materiales-tienda-buscador/materiales-tienda-buscador.component';

@Component({
  selector: 'app-arrendamientos',
  templateUrl: './arrendamientos.component.html',
  styleUrls: ['./arrendamientos.component.css']
})
export class ArrendamientosComponent implements OnInit {

  currentUser: Usuarios;

  formArrendamiento: FormGroup;
  formMateriales: FormArray = new FormArray([]);

  estados: Estados[] = [];
  proveedores: Proveedores[] = [];
  monedas: Monedas[] = [];

  constructor(
    private notificationService: NotificationsService,
    private formBuilder: FormBuilder,
    private estadoService: EstadosService,
    private proveedorService: ProveedoresService,
    private monedaService: MonedasService,
    private authService: AuthService,
    private dialogoService: DialogosService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.getEstados();
    this.getProveedores();
    this.getMonedas();
    this.initForm();
  }

  private initForm(): void {
    try {
      this.formArrendamiento = this.formBuilder.group({
        fecha_inicio: [new Date(), Validators.required],
        fecha_fin: [new Date(), Validators.required],
        total: [{ value: 0, disabled: true }, Validators.required],
        fk_id_estado: [0, Validators.required],
        fk_id_moneda: [0, Validators.required],
        fk_id_usuario: [this.currentUser.id, Validators.required],
        fk_id_proveedor: [this.currentUser.id, Validators.required],
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getEstados(): void {
    try {
      this.estadoService.getEstados().subscribe(value => {
        if (value.ok) {
          this.estados = value.data;
        }
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getProveedores(): void {
    try {
      this.proveedorService.getProveedores().subscribe(value => {
        if (value.ok) {
          this.proveedores = value.data;
        }
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

  searchMaterial(): void {
    try {
      this.dialogoService
        .openDialog(MaterialesTiendaBuscadorComponent)
        .beforeClosed()
        .subscribe((value: MaterialesTienda) => {
          console.log(value);
        });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
