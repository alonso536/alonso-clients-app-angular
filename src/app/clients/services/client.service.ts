import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client, Response } from '../interfaces/client.interface';
import { Observable, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { PageResponse } from '../../shared/interfaces/page-response.interface';
import { Region } from '../interfaces/region.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url: string = 'http://localhost:8080/api/clients';
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  index(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url, { headers: this.headers });
  }

  indexPage(page: number): Observable<PageResponse<Client>> {
    return this.http.get<PageResponse<Client>>(`${this.url}/page/${page}`, { headers: this.headers });
  }

  regions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.url}/regions`, { headers: this.headers });
  }

  store(client: Client): Observable<Response> {
    return this.http.post<Response>(this.url, client, { headers: this.headers }).pipe(
      catchError(e => {
        if(e.status == 400) {
          return of(e.errors);
        }

        Swal.fire('Error', e.error.msg, 'error');
        return of(e);
      })
    );
  }

  show(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.url}/${id}`, { headers: this.headers }).pipe(
      catchError(e => {
        this.router.navigate(['/clients/home']);
        Swal.fire('Error', e.error.msg, 'error');
        return of(e);
      })
    );
  }

  update(client: Client): Observable<Response> {
    return this.http.put<Response>(`${this.url}/${client.id}`, client, { headers: this.headers }).pipe(
      catchError(e => {
        if(e.status == 400) {
          return of(e.errors);
        }

        Swal.fire('Error', e.error.msg, 'error');
        return of(e);
      })
    );
  }

  destroy(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.url}/${id}`, { headers: this.headers }).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.msg, 'error');
        return of(e);
      })
    );
  }

  upload(file: File, id: string): Observable<Response> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    
    return this.http.post<Response>(`${this.url}/upload`, formData, { headers: { 'Authorization': 'Bearer ' + this.authService.token } }).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.error, 'error');
        return of(e);
      })
    );
  }
}