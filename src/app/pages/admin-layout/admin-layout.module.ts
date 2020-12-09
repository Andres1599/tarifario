import { LOCALE_ID, NgModule } from '@angular/core';
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
import { ComponentsModule } from 'app/components/components.module';
import { TiendasComponent } from '../tiendas/tiendas.component';

import { registerLocaleData } from '@angular/common';
import localeGT from '@angular/common/locales/es-GT';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ArrendamientosService } from 'app/services/arrendamientos/arrendamientos.service';
import { ImpresionArrendamientoComponent } from '../impresion-arrendamiento/impresion-arrendamiento.component';
import { NgPrintModule } from 'ng-print';

registerLocaleData(localeGT, 'es-GT');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    NgPrintModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    AdministracionComponent,
    TiendasComponent,
    ImpresionArrendamientoComponent,
  ],
  providers: [
    UserService,
    ArrendamientosService,
    { provide: LOCALE_ID, useValue: 'es-GT' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-GT' },
  ],
})

export class AdminLayoutModule { }
