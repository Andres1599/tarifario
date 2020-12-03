import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/profile', title: 'Perfil', icon: 'person', class: '' },
  { path: '/catalogo', title: 'Catálogos', icon: 'content_paste', class: '' },
  { path: '/arrendamiento', title: 'Arrendamientos', icon: 'library_books', class: '' },
  { path: '/tiendas', title: 'Tiendas', icon: 'store', class: '' },
  { path: '/admin', title: 'Administración', icon: 'admin_panel_settings', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
