import { Routes } from '@angular/router';
import { AdministracionComponent } from '../administracion/administracion.component';
import { TypographyComponent } from '../arrendamientos/typography.component';
import { TableListComponent } from '../catalogos/table-list.component';
import { ImpresionArrendamientoComponent } from '../impresion-arrendamiento/impresion-arrendamiento.component';
import { TiendasComponent } from '../tiendas/tiendas.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            /* { path: 'dashboard', component: DashboardComponent }, */
            { path: 'profile', component: UserProfileComponent },
            { path: 'catalogo', component: TableListComponent },
            { path: 'arrendamiento', component: TypographyComponent },
            { path: 'arrendamiento/:id', component: ImpresionArrendamientoComponent },
            { path: 'tiendas', component: TiendasComponent },
            { path: 'admin', component: AdministracionComponent },
        ]
    }
];
