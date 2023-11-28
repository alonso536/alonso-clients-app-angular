import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-image',
  templateUrl: './form-image.component.html',
  styles: [
  ]
})
export class FormImageComponent {
  public title: string = "Subir imagen";
  public file?: File;

  @Input()
  public id: number = 0;

  @Output()
  public client = new EventEmitter<Client>();

  constructor(private clientService: ClientService) {}

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

    this.clientService.upload(this.file!, this.id.toString())
      .subscribe(response => {
        if(response.client) {
          this.client.emit(response.client);
        }
      });
  }
}
