import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

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
        component: CreatePageComponent
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
export class ProductRoutingModule { }