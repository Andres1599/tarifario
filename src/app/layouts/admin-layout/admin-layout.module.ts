import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { MaterialModule } from 'app/material.module';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { TableListComponent } from 'app/pages/catalogos/table-list.component';
import { TypographyComponent } from 'app/pages/arrendamientos/typography.component';

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
  ]
})

export class AdminLayoutModule { }
