import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tiendas } from 'app/models/tienda.model';

@Component({
  selector: 'app-tiendas-dialogo',
  templateUrl: './tiendas-dialogo.component.html',
  styleUrls: ['./tiendas-dialogo.component.css']
})
export class TiendasDialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TiendasDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tiendas,
  ) { }

  ngOnInit(): void {
  }

}
