import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Invoice, InvoiceResponse } from '../interfaces/invoice.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private url: string = 'http://localhost:8080/api/invoices';
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token });
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  show(id: number): Observable<InvoiceResponse> {
    return this.http.get<Response>(`${this.url}/${id}`, { headers: this.headers }).pipe(
      catchError(e => {
        this.router.navigate(['/clients/home']);
        Swal.fire('Error', e.error.msg, 'error');
        return of(e);
      })
    );
  }

  store(invoice: Invoice): Observable<InvoiceResponse> {
    return this.http.post(`${this.url}`, invoice, { headers: this.headers });
  }

  delete(id: number): Observable<InvoiceResponse | void> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers }).pipe(
      catchError(e => {
        this.router.navigate(['/clients/home']);
        Swal.fire('Error', e.error.msg, 'error');
        return of(e);
      })
    )
  }
}
