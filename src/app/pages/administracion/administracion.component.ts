import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosComponent } from 'app/components/usuarios/usuarios.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  @ViewChild('usuarios') usuarios: UsuariosComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
