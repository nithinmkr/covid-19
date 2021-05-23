import { Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';

export const DefaultRoute: Routes =
    [
        {
            path: '', redirectTo: 'dashboard', pathMatch: 'full'
        },
        {
            path: 'dashboard',
            loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'country',
            loadChildren: () => import('../countries/countries.module').then(m => m.CountriesModule),
            canActivate: [AuthGuard]
        }
    ]