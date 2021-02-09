import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  
  /*{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
*/
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate:[AuthGuard]
  },  
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reg-tienda',
    loadChildren: () => import('./reg-tienda/reg-tienda.module').then( m => m.RegTiendaPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'anuncios',
    loadChildren: () => import('./anuncios/anuncios.module').then( m => m.AnunciosPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'editar-tienda',
    loadChildren: () => import('./editar-tienda/editar-tienda.module').then( m => m.EditarTiendaPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'borrar-tienda',
    loadChildren: () => import('./borrar-tienda/borrar-tienda.module').then( m => m.BorrarTiendaPageModule),canActivate:[AuthGuard]
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
