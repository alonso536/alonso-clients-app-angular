import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent {
  public myForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: [ (false) ? 'Hola' : '', [ Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
    description: [ '', [ Validators.required ] ],
    sku: [ '', [ Validators.required ] ],
    price: [ 0, [ Validators.required, Validators.min(1) ] ],
    stock: [ 0, [ Validators.required, Validators.min(1) ] ],
    status: true
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  isValidField(field: string) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.productService.store(this.myForm.value)
      .subscribe(response => {
        this.router.navigate(['/products/home']);
        Swal.fire(
          'Producto creado',
          response.msg,
          'success'
        );
      });
  }
}
