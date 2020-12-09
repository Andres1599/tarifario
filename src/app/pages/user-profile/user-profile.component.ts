import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Arrendamientos } from 'app/models/arrendamiento.model';
import { Estados } from 'app/models/estado.model';
import { Tiendas } from 'app/models/tienda.model';
import { Usuarios } from 'app/models/usuario.model';
import { ArrendamientosService } from 'app/services/arrendamientos/arrendamientos.service';
import { AuthService } from 'app/services/auth/auth.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { TiendasService } from 'app/services/tiendas/tiendas.service';
import { UserService } from 'app/services/user/user.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  usuario: Usuarios;
  usuarioG: Usuarios;

  formUser: FormGroup;

  tiendas: Tiendas[] = [];
  arrendamientos: Arrendamientos[] = [];
  misArrendamientos: Arrendamientos[] = [];

  dataSourceArrendamientos: MatTableDataSource<Arrendamientos>;
  displayedColumns: string[] = ['fk_id_proveedor', 'fecha_inicio', 'fecha_fin', 'total', 'fk_id_estado', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private usuarioService: UserService,
    private notificationService: NotificationsService,
    private formBuilder: FormBuilder,
    private arrendamientoService: ArrendamientosService,
    private router: Router,
    private tiendaService: TiendasService,
  ) { }

  ngOnInit() {
    this.usuario = this.authService.getUser();
    this.getUser();
    this.getArrendamientos();
    this.getAllArrendamientos();
    this.getTiendas();
  }

  private initFormUser(usuario: Usuarios): void {
    try {
      this.formUser = this.formBuilder.group({
        id: [usuario.id, Validators.required],
        nombre: [usuario.nombre, Validators.required],
        apellido: [usuario.apellido, Validators.required],
        correo: [usuario.correo, Validators.required],
        estado: [usuario.estado, Validators.required],
        fk_id_tipo_usuario: [usuario.fk_id_tipo_usuario, Validators.required],
      });
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getUser(): void {
    try {
      this.usuarioService.getUser(this.usuario).subscribe(value => {
        if (value.ok) {
          this.usuarioG = value.data[0];
          this.initFormUser(this.usuarioG);
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  updateUser(): void {
    try {
      const usuario: Usuarios = this.formUser.value;
      this.usuarioService.updateUser(usuario).subscribe(value => {
        if (value.ok) {
          this.notificationService.showSuccessNotification(MESSAGE_ES.update);
          this.getUser();
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getArrendamientos(): void {
    try {
      this.arrendamientoService.getArrendamientosByUsuario(this.usuario.id).subscribe(value => {
        if (value.ok) {
          this.misArrendamientos = value.data;
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

  wantPrint(arrendamiento: Arrendamientos): void {
    try {
      this.router.navigateByUrl('/arrendamiento/' + `${arrendamiento.id}`);
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

  private getAllArrendamientos(): void {
    try {
      this.arrendamientoService.getArrendamientos().subscribe(value => {
        if (value.ok) {
          this.arrendamientos = value.data;
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
