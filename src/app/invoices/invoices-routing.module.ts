import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailPageComponent } from './pages/invoice-detail/invoice-detail-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { canActivatedRoleGuard, canMatchRoleGuard } from '../auth/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create/:id',
        component: CreatePageComponent,
        canActivate: [canActivatedRoleGuard],
        canMatch: [canMatchRoleGuard]
      },
      {
        path: 'show/:id',
        component: InvoiceDetailPageComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }