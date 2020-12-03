import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estados } from 'app/models/estado.model';

@Component({
  selector: 'app-estados-dialogo',
  templateUrl: './estados-dialogo.component.html',
  styleUrls: ['./estados-dialogo.component.css']
})
export class EstadosDialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EstadosDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estados,
  ) { }

  ngOnInit(): void {
  }

}
