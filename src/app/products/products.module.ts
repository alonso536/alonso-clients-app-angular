import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductRoutingModule } from './products-routing.module';
import { ProductPaginatorComponent } from './components/product-paginator/product-paginator.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormImageComponent } from './components/form-image/form-image.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ProductPaginatorComponent,
    ProductCardComponent,
    TableProductsComponent,
    CreatePageComponent,
    ProductFormComponent,
    FormImageComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TableProductsComponent
  ]
})
export class ProductsModule { }
