import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableInvoicesComponent } from './components/table-invoices/table-invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceDetailPageComponent } from './pages/invoice-detail/invoice-detail-page.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [
    TableInvoicesComponent,
    InvoiceDetailPageComponent,
    InvoiceFormComponent,
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ProductsModule
  ],
  exports: [
    TableInvoicesComponent
  ]
})
export class InvoicesModule { }
