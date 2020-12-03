import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadosComponent } from 'app/components/estados/estados.component';
import { MonedasComponent } from 'app/components/monedas/monedas.component';
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
  @ViewChild('estados') estados: EstadosComponent;
  @ViewChild('monedas') monedas: MonedasComponent;
  
  constructor() { }

  ngOnInit(): void {
  }

}
