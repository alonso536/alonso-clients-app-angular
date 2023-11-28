import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'products-form-image',
  templateUrl: './form-image.component.html',
  styles: []
})
export class FormImageComponent implements OnChanges {
  public title: string = "Subir imagen";
  public file?: File;

  @Input()
  public id: number = 0;

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const updatedId = changes['id'];
    
    if(updatedId.previousValue) {
      this.id = updatedId.currentValue;
    }
  }

  selectFile(event: any) {
    this.file = event.target.files[0];

    if(this.file!.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo debe ser una imagen', 'error');
      this.file = undefined;
    }
  }

  uploadFile() {
    if(!this.file) {
      Swal.fire('Error', 'Debe seleccionar una imagen', 'error');
      return;
    }

    this.productService.upload(this.file!, this.id.toString())
      .subscribe(response => {
        if(response.product) {
          
        }
      });
  }
}
