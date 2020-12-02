import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from 'app/services/auth/auth.service';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { MaterialModule } from 'app/material.module';
import { ProveedoresService } from 'app/services/proveedores/proveedores.service';
import { UserService } from 'app/services/user/user.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProveedoresComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProveedoresComponent
  ],
  providers: [
    AuthService,
    ProveedoresService,
    UserService,
    NotificationsService,
  ],
})
export class ComponentsModule { }
