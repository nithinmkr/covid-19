import { Routes } from '@angular/router';

export const AuthRoute: Routes = [
    {
        path: '', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
    }
]