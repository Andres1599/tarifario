import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArrendamientoMateriales } from 'app/models/arrendamiento.material.model';
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
  formItemArrendamiento: FormGroup;
  formMateriales: FormArray = new FormArray([]);

  arrendamientoMateriales: ArrendamientoMateriales[] = [];

  estados: Estados[] = [];
  proveedores: Proveedores[] = [];
  monedas: Monedas[] = [];

  currentMaterial: MaterialesTienda = {};

  dataSourceMateriales: MatTableDataSource<ArrendamientoMateriales>;
  displayedColumns: string[] = ['fk_id_material_tienda', 'observacion', 'cantidad', 'precio', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
        fk_id_estado: [, Validators.required],
        fk_id_moneda: [, Validators.required],
        fk_id_usuario: [this.currentUser.id, Validators.required],
        fk_id_proveedor: [, Validators.required],
      });

      this.formItemArrendamiento = this.formBuilder.group({
        observacion: ['', Validators.required],
        cantidad: [0, Validators.required],
        precio: [0, Validators.required],
        fk_id_material_tienda: [0, Validators.required],
        materiale: []
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
          if (value) {
            this.currentMaterial = value;
            this.setValueForm(value);
          }
        });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private setValueForm(value: MaterialesTienda): void {
    try {
      this.formItemArrendamiento.get('precio').setValue(value.precio);
      this.formItemArrendamiento.get('cantidad').setValue(value.cantidad);
      this.formItemArrendamiento.get('fk_id_material_tienda').setValue(value.id);
      this.formItemArrendamiento.get('materiale').setValue(value.materiale);
      this.formItemArrendamiento.controls['cantidad'].setValidators([Validators.max(value.cantidad)]);
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private clearFormItem(): void {
    try {
      this.formItemArrendamiento.setValue({
        observacion: '',
        cantidad: 0,
        precio: 0,
        fk_id_material_tienda: 0,
        materiale: null
      });

      this.currentMaterial = {};
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  addItemArrendamiento(): void {
    try {
      if (this.formItemArrendamiento.valid) {
        this.arrendamientoMateriales.push(this.formItemArrendamiento.value);
        this.updateTable(this.arrendamientoMateriales);
        this.clearFormItem();
      } else {
        this.notificationService.showErrorNotification('Completa los campos para agregar al listado el material');
      }
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  updateTable(value: ArrendamientoMateriales[]) {
    this.dataSourceMateriales = new MatTableDataSource<ArrendamientoMateriales>(value);
    this.dataSourceMateriales.paginator = this.paginator;
    this.dataSourceMateriales.sort = this.sort;
  }

  removeItem(element: ArrendamientoMateriales): void {
    try {
      const index = this.arrendamientoMateriales.findIndex(value => value === element);
      if (index > -1) {
        this.arrendamientoMateriales.splice(index, 1);
        this.updateTable(this.arrendamientoMateriales);
      }
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
