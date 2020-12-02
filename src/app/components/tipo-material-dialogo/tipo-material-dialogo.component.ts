import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoMateriales } from 'app/models/tipo.material.model';

@Component({
  selector: 'app-tipo-material-dialogo',
  templateUrl: './tipo-material-dialogo.component.html',
  styleUrls: ['./tipo-material-dialogo.component.css']
})
export class TipoMaterialDialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TipoMaterialDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoMateriales,
  ) { }

  ngOnInit(): void {
  }

}
