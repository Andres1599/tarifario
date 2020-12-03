import { Component, OnInit, ViewChild } from '@angular/core';
import { TiendasTableComponent } from 'app/components/tiendas/tiendas.component';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  @ViewChild('tiendas') tiendaTable: TiendasTableComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
