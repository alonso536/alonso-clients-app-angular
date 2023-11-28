import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/products.interface';
import { ProductService } from '../../services/product.service';
import { PageResponse } from 'src/app/shared/interfaces/page-response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from 'src/app/auth/interfaces/user.interface';

@Component({
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {
  public title: string = 'Listado de productos';
  public products: Product[] = [];
  public paginator!: PageResponse<Product>;
  public page: number = 0;
  public user?: UserDto;

  public id: number = 0;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.profile().subscribe(user => {
      this.user = user;
    });

    this.activatedRoute.paramMap.subscribe(
      params => {
        let page: number = +params.get('page')!;
        
        if(page != null) {
          this.page = page;
        };
        this.showProducts();
      }
    ); 
  }

  showProducts() {
    this.productService.indexPage(this.page).subscribe(
      response => {
        this.paginator = response;
        this.products = response.content;
      }
    );
  }

  saveId(id: number) {
    this.id = id;
  }
}
