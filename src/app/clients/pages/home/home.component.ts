import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client.interface';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { catchError, of } from 'rxjs';
import { PageResponse } from 'src/app/shared/interfaces/page-response.interface';

@Component({
  selector: 'clients-home-page',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {
  public title: string = 'Listado de clientes';
  public clients: Client[] = [];
  public paginator!: PageResponse<Client>;
  public page: number = 0;
  public user?: UserDto;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
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
        this.showClients();
      }
    );    
  }

  showClients() {
    this.clientService.indexPage(this.page).subscribe(
      response => {
        this.paginator = response;
        this.clients = response.content;
      }
    );
  }
}
