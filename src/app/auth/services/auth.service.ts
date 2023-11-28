import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthResponse, UserDto } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080';
  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private user?: UserDto;

  constructor(private http: HttpClient) {}

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  checkAuthentication(): Observable<boolean> {
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('username')) return of(false);

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');

    return this.http.get<UserDto>(`${this.baseUrl}/api/users/${username}`, { headers: { 'Authorization': 'Bearer ' + token } })
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      );
  }

  isAdmin(): Observable<boolean> {
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('username')) return of(false);

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    
    return this.http.get<UserDto>(`${this.baseUrl}/api/users/${username}`, { headers: { 'Authorization': 'Bearer ' + token } })
      .pipe(
        tap(user => this.user = user),
        map(user => user.admin),
        catchError(err => of(false))
      );  
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { username, password }, { headers: this.httpHeaders })
      .pipe(
        catchError(err => of(err.error as AuthResponse))
      );
  }

  register(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/api/users`, user);
  }

  logout() {
    sessionStorage.clear();
  }

  profile(): Observable<UserDto> {
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('username')) throw new Error(`El usuario no está autenticado`);

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    return this.http.get<UserDto>(`${this.baseUrl}/api/users/${username}`, { headers: { 'Authorization': 'Bearer ' + token } });
  }

  saveUser(token: string, username: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
  }
}
