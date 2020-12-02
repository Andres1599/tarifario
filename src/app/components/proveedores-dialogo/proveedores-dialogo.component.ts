import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proveedores } from 'app/models/proveedor.model';

@Component({
  selector: 'app-proveedores-dialogo',
  templateUrl: './proveedores-dialogo.component.html',
  styleUrls: ['./proveedores-dialogo.component.css']
})
export class ProveedoresDialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProveedoresDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proveedores,
  ) { }

  ngOnInit(): void {
  }

}
