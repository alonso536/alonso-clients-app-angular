import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { CreatePageComponent } from './pages/create/create.component';
import { DetailsPageComponent } from './pages/details/details.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { canActivatedRoleGuard, canMatchRoleGuard } from '../auth/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'home/page/:page',
        component: HomePageComponent
      },
      {
        path: 'create',
        component: CreatePageComponent,
        canActivate: [canActivatedRoleGuard],
        canMatch: [canMatchRoleGuard]
      },
      {
        path: 'edit/:id',
        component: CreatePageComponent,
        canActivate: [canActivatedRoleGuard],
        canMatch: [canMatchRoleGuard]
      },
      {
        path: 'show/:id',
        component: DetailsPageComponent
      },
      {
        path: 'invoice',
        loadChildren: () => import('../invoices/invoices.module').then(m => m.InvoicesModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }