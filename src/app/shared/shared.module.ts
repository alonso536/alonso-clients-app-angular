import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Error404PageComponent } from './pages/error404/error404.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    Error404PageComponent,
    ProfilePageComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ProfilePageComponent
  ]
})
export class SharedModule { }
