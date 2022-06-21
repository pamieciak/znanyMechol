import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AdminDashboardComponent } from './shell/admin/admin-dashboard/admin-dashboard.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        loadChildren: async () => (await import('./auth/auth.module')).AuthModule,
      },
      {
        path: 'home',
        loadChildren: async () => (await import('./shell/shell.module')).ShellModule,
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
