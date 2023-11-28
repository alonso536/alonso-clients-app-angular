import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { HomePageComponent } from './pages/home/home.component';
import { TableClientsComponent } from './components/table-clients/table-clients.component';

import { HttpClientModule } from '@angular/common/http';
import { CreatePageComponent } from './pages/create/create.component';
import { FormClientsComponent } from './components/form-clients/form-clients.component';
import { FormsModule } from '@angular/forms';
import { PaginatorClientsComponent } from './components/paginator/paginator.component';
import { DetailsPageComponent } from './pages/details/details.component';
import { FormImageComponent } from './components/form-image/form-image.component';
import { InvoicesModule } from '../invoices/invoices.module';

@NgModule({
  declarations: [
    HomePageComponent,
    TableClientsComponent,
    CreatePageComponent,
    FormClientsComponent,
    PaginatorClientsComponent,
    DetailsPageComponent,
    FormImageComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    HttpClientModule,
    FormsModule,
    InvoicesModule
  ]
})
export class ClientsModule { }
