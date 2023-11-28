import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'auth-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})
export class LoginFormComponent {
  public username: string = '';
  public password: string = '';
  public isValid: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.isValid = true;

    this.authService.login(this.username, this.password)
      .subscribe(response => {
        if(response.error) {
          this.isValid = false;
          return;
        }

        if(!response.token || !response.username) return;

        this.authService.saveUser(response.token!, response.username!);
        this.router.navigate(['/clients/home']);
        Swal.fire(
          'Inicio de sesión exitoso',
          response.msg,
          'success'
        );
      });
  }
}
