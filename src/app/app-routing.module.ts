import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultRoute } from './routes/default-route';
import { AuthRoute } from './routes/auth-route';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: DefaultRoute },
  { path: 'auth', children: AuthRoute },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
