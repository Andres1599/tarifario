import { Routes } from '@angular/router';

import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TableListComponent } from 'app/pages/catalogos/table-list.component';
import { TypographyComponent } from '../../pages/arrendamientos/typography.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
];
