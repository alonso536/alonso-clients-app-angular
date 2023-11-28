import { Component, Input } from '@angular/core';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import Swal from 'sweetalert2';
import { UserDto } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'table-invoices',
  templateUrl: './table-invoices.component.html',
  styles: [
  ]
})
export class TableInvoicesComponent {
  @Input()
  public invoices?: Invoice[] = [];

  @Input()
  public user?: UserDto;

  constructor(private invoiceService: InvoiceService) {}

  delete(invoice: Invoice) {
    if(!this.user?.admin) return;

    Swal.fire({
      title: 'Está seguro que desea eliminar esta factura',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.delete(invoice.id).subscribe(
          response => {
            this.invoices = this.invoices!.filter(i => i.id != invoice.id);
            Swal.fire(
              'Factura eliminada',
              'Factura eliminada con exito',
              'success'
            )
          }
        );
      }
    })
  }
}
