import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product, ProductResponse } from '../interfaces/products.interface';
import { PageResponse } from 'src/app/shared/interfaces/page-response.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = 'http://localhost:8080/api/products';
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token });
  
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  index(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { headers: this.headers });
  }

  indexPage(page: number): Observable<PageResponse<Product>> {
    return this.http.get<PageResponse<Product>>(`${this.url}/page/${page}`, { headers: this.headers });
  }

  search(term: String): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${term}`, { headers: this.headers });
  }

  store(product: Product): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.url, product, { headers: this.headers });
  }

  destroy(id: number): Observable<ProductResponse> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers })
  }

  upload(file: File, id: string): Observable<ProductResponse> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    
    return this.http.post<ProductResponse>(`${this.url}/upload`, formData, { headers: { 'Authorization': 'Bearer ' + this.authService.token } }).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.error, 'error');
        return of(e);
      })
    );
  }
}