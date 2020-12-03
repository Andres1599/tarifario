import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Monedas } from 'app/models/moneda.model';

@Component({
  selector: 'app-monedas-dialogo',
  templateUrl: './monedas-dialogo.component.html',
  styleUrls: ['./monedas-dialogo.component.css']
})
export class MonedasDialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MonedasDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Monedas,
  ) { }

  ngOnInit(): void {
  }

}
