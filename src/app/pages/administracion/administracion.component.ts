import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUsuariosComponent } from 'app/components/tipo-usuarios/tipo-usuarios.component';
import { UsuariosComponent } from 'app/components/usuarios/usuarios.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  @ViewChild('usuarios') usuarios: UsuariosComponent;
  @ViewChild('tipoUsuarios') tipoUsuarios: TipoUsuariosComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
