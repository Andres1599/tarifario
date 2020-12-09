import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrendamientoMateriales } from 'app/models/arrendamiento.material.model';
import { Arrendamientos } from 'app/models/arrendamiento.model';
import { ArrendamientosService } from 'app/services/arrendamientos/arrendamientos.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-impresion-arrendamiento',
  templateUrl: './impresion-arrendamiento.component.html',
  styleUrls: ['./impresion-arrendamiento.component.css']
})
export class ImpresionArrendamientoComponent implements OnInit {

  private idArrendamiento = 0;

  arrendamiento: Arrendamientos;
  dataSourceMateriales: MatTableDataSource<ArrendamientoMateriales>;
  displayedColumns: string[] = ['fk_id_material_tienda', 'tipo','observacion', 'cantidad', 'precio', 'total'];

  constructor(
    private router: ActivatedRoute,
    private notificationService: NotificationsService,
    private arrendamientoService: ArrendamientosService
  ) { }

  ngOnInit(): void {
    this.getIdArrendamiento();
  }

  private getIdArrendamiento() {
    try {
      this.router.params.subscribe(params => {
        this.idArrendamiento = params.id;
        this.getArrendamiento(this.idArrendamiento);
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

  private getArrendamiento(id: number): void {
    try {
      this.arrendamientoService.getArrendamientosById(id).subscribe(value => {
        if (value.ok) {
          this.arrendamiento = value.data;
          console.log(this.arrendamiento)
          this.dataSourceMateriales = new MatTableDataSource<ArrendamientoMateriales>(value.data.arrendamientos_materiales);
        }
      })
    } catch (error) {
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
