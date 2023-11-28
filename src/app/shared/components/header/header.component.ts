import { Component, OnInit } from '@angular/core';
import { Link } from '../../interfaces/link.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public user?: UserDto;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.profile().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
