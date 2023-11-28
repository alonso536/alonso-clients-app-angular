import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../interfaces/products.interface';
import { PageResponse } from 'src/app/shared/interfaces/page-response.interface';

@Component({
  selector: 'products-product-paginator',
  templateUrl: './product-paginator.component.html'
})
export class ProductPaginatorComponent implements OnInit, OnChanges {
  @Input()
  public paginator!: PageResponse<Product>;

  public pages: number[] = [];
  public from: number = 0;
  public to: number = 0;

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedPaginator = changes['paginator'];

    if(updatedPaginator.previousValue) {
      this.initPaginator();
    }
  }

  initPaginator(): void {
    this.from = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
    this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);

    if(this.paginator.totalPages > 5) {
      this.pages = new Array(this.to - this.from - 1)
        .fill(0)
        .map((key, value) => value + this.from);
    } else {
      this.pages = new Array(this.paginator.totalPages)
        .fill(0)
        .map((key, value) => value + 1);
    }
  }
}
