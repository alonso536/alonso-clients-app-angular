import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';

import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { UserDto } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'table-clients',
  templateUrl: './table-clients.component.html',
  styles: [
  ]
})
export class TableClientsComponent implements OnChanges {
  @Input()
  public clients: Client[] = [];

  @Input()
  public user?: UserDto;

  constructor(private service: ClientService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let updatedClients = changes['clients'];

    if(updatedClients.previousValue) {
      this.clients = updatedClients.currentValue;
    }
  }

  delete(client: Client): void {
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
        this.service.destroy(client.id).subscribe(
          response => {
            this.clients = this.clients.filter(c => c.id != client.id);
            Swal.fire(
              'Cliente eliminado',
              'Cliente eliminado con exito',
              'success'
            )
          }
        );
      }
    })
  }
}
