import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MaterialModule } from 'app/material.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { TableListComponent } from '../catalogos/table-list.component';
import { TypographyComponent } from '../arrendamientos/typography.component';
import { AdministracionComponent } from '../administracion/administracion.component';
import { UserService } from 'app/services/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    AdministracionComponent,
  ],
  providers: [
    UserService,
  ],
})

export class AdminLayoutModule { }
