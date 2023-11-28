import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../interfaces/invoice.interface';

@Component({
  templateUrl: './invoice-detail-page.component.html',
  styles: [
  ]
})
export class InvoiceDetailPageComponent implements OnInit {
  public invoice?: Invoice;
  public title: string = 'Factura';

  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id: number = params['id'];

      if(id) {
        this.invoiceService.show(id).subscribe(response => {
          this.invoice = response.invoice!;
        });
      }
    });
  }
}
