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
import { ProveedoresDialogoComponent } from './proveedores-dialogo/proveedores-dialogo.component';
import { DialogosService } from 'app/services/dialogos/dialogos.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProveedoresComponent,
    ProveedoresDialogoComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProveedoresComponent,
    ProveedoresDialogoComponent
  ],
  providers: [
    AuthService,
    ProveedoresService,
    UserService,
    NotificationsService,
    DialogosService
  ],
})
export class ComponentsModule { }
