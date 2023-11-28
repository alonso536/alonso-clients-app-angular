import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404/error404.component';
import { ProfilePageComponent } from './shared/pages/profile-page/profile-page.component';
import { canActivatedGuard, canMatchGuard } from './auth/guards/auth.guard';
import { canActivatedPublicGuard, canMatchPublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
    canActivate: [canActivatedGuard],
    canMatch: [canMatchGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [canActivatedGuard],
    canMatch: [canMatchGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [canActivatedPublicGuard],
    canMatch: [canMatchPublicGuard]
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [canActivatedGuard],
    canMatch: [canMatchGuard]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
