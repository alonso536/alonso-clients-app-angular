import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { InvoiceItem } from 'src/app/invoices/interfaces/invoice.interface';

@Component({
  selector: 'table-products',
  templateUrl: './table-products.component.html',
  styles: [
  ]
})
export class TableProductsComponent implements OnChanges {
  @Input()
  public items: InvoiceItem[] = [];

  @Input()
  public disabled: boolean = false;

  @Output()
  public productUpdatedId = new EventEmitter<[number, number]>();

  @Output()
  public productDeletedId = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    let updatedItems = changes['items'];

    if(updatedItems.previousValue) {
      this.items = updatedItems.currentValue;
    }
  }

  update(id: number, event: any) {
    const value = +event.target?.value;

    if(value <= 0) {
      this.productUpdatedId.emit([id, 1]);
      event.target.value = 1;
      return;
    }

    this.productUpdatedId.emit([id, value]);
  }

  delete(id: number) {
    this.productDeletedId.emit(id);
  }
}
