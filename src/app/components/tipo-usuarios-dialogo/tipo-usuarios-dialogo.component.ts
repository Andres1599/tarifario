import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoUsuarios } from 'app/models/tipo.usuario.model';

@Component({
  selector: 'app-tipo-usuarios-dialogo',
  templateUrl: './tipo-usuarios-dialogo.component.html',
  styleUrls: ['./tipo-usuarios-dialogo.component.css']
})
export class TipoUsuariosDialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TipoUsuariosDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoUsuarios,
  ) { }

  ngOnInit(): void {
  }

}
