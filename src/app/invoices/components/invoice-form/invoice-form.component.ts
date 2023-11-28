import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/clients/services/client.service';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../interfaces/invoice.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Product } from 'src/app/products/interfaces/products.interface';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../products/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice-form.component.html',
  styles: [
  ]
})
export class InvoiceFormComponent implements OnInit {
  public invoice: Invoice = {
    id: 0,
    items: [],
    total: 0,
    client: {
      id: 0,
      name: '',
      lastname: '',
      email: '',
      phone: 0
    }
  };

  public searchInput = new FormControl('');
  public errorMessage = '';
  public selectedProduct?: Product;
  public products: Product[] = [];

  constructor(
    private clientService: ClientService,
    private invoiceService: InvoiceService,
    private ProductService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      if(isNaN(id)) {
        this.router.navigate(['clients/home'])
      }

      this.clientService.show(id).subscribe(response => {
        if(response.client) {
          this.invoice.client = response.client;
        }
      });
    });
  }

  searchProducts() {
    const value: string = this.searchInput.value || '';
    this.ProductService.search(value)
      .subscribe(products => this.products = products);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value) {
      this.selectedProduct = undefined;
      return;
    }

    const product: Product = event.option.value;
    this.searchInput.setValue(product.name);
    this.selectedProduct = product;

    if(this.invoice.items.find(i => i.product.id == this.selectedProduct!.id)) {
      this.updateItem(this.selectedProduct.id);
      return;
    }

    this.addItem(this.selectedProduct);
    this.calculateTotal();
  }

  addItem(product: Product) {
    this.invoice.items.push({ id: 0, product, quantity: 1, import: product.price });
  }

  updateItem(id: number, quantity: number = 1) {
    if(quantity <= 0) return;

    const index = this.invoice.items.findIndex(i => i.product.id == id);
    if(index != -1) {
      this.invoice.items[index].quantity += quantity
      this.invoice.items[index].import = this.invoice.items[index].quantity * this.invoice.items[index].product.price;
    }
  }

  updateItemByInput([id, quantity]: number[]) {
    const index = this.invoice.items.findIndex(i => i.product.id == id);
    if(index != -1) {
      this.invoice.items[index].quantity = quantity
      this.invoice.items[index].import = this.invoice.items[index].quantity * this.invoice.items[index].product.price;
    }

    this.calculateTotal();
  }

  deleteItem(id: number) {
    this.invoice.items = this.invoice.items.filter(i => i.product.id != id);
    this.calculateTotal();
  }

  calculateTotal() {
    this.invoice.total = this.invoice.items
      .map(i => i.import)
      .reduce((acc, curr) => acc + curr, 0);
  }

  store() {
    this.errorMessage = '';

    if(this.invoice.items.length == 0) {
      this.errorMessage = 'Debe agregar productos a la factura';
      return;
    }

    this.invoiceService.store(this.invoice)
      .subscribe(response => {
        if(response.errors) {
          Swal.fire(
            'No se pudo crear la factura',
            response.msg,
            'success'
          );
        }
        this.router.navigate(['/clients/show/', this.invoice.client.id])
        Swal.fire(
          'Factura creada',
          response.msg,
          'success'
        );
      });
  }
}
