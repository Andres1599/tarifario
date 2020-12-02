import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedoresComponent } from 'app/components/proveedores/proveedores.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  @ViewChild('proveedores') proveedores: ProveedoresComponent;
  
  constructor() { }

  ngOnInit() {}

}
