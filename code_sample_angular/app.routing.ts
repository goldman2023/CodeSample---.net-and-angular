import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './core/guards/auth-guard.service';

import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

export const routes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'change-password', component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', loadChildren: 'app/pages/pages.module#PagesModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: 'app/pages/auth/auth.module#AuthModule' },
  { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
