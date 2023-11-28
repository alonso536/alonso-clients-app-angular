import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/products.interface';
import { UserDto } from 'src/app/auth/interfaces/user.interface';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'products-product-card',
  templateUrl: './product-card.component.html',
  styles: [
  ]
})
export class ProductCardComponent {
  @Input()
  public product!: Product;

  @Input()
  public user?: UserDto;

  @Output()
  public id = new EventEmitter<number>();

  constructor(private productService: ProductService) {}

  setProduct(product: Product) {
    this.product = product;
  }

  sendId() {
    this.id.emit(this.product.id);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Está seguro que desea eliminar este cliente',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.destroy(id).subscribe(
          response => {
            Swal.fire(
              'Producto eliminado',
              'Producto eliminado con exito',
              'success'
            )
          }
        );
      }
    });
  }
}
