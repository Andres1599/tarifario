import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Materiales } from 'app/models/material.model';
import { TipoMateriales } from 'app/models/tipo.material.model';
import { MaterialesService } from 'app/services/materiales/materiales.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { MESSAGE_ES } from 'app/utils/messages';

@Component({
  selector: 'app-materiales-dialogo',
  templateUrl: './materiales-dialogo.component.html',
  styleUrls: ['./materiales-dialogo.component.css']
})
export class MaterialesDialogoComponent implements OnInit {

  tipoMateriales: TipoMateriales[] = [];

  constructor(
    public dialogRef: MatDialogRef<MaterialesDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Materiales,
    private notificationService: NotificationsService,
    private materialesService: MaterialesService
  ) { }

  ngOnInit(): void {
    this.getTipoMateriales();
  }

  private getTipoMateriales(): void {
    try {
      this.materialesService.getTipoMaterial().subscribe(value => {
        if (value.ok) {
          this.tipoMateriales = value.data;
        }
      })
    } catch (error) {
      console.error(error)
      this.notificationService.showErrorNotification(MESSAGE_ES.error);
    }
  }

}
