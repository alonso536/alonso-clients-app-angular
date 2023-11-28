import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { UserDto } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'clients-details-page',
  templateUrl: './details.component.html',
  styles: [
  ]
})
export class DetailsPageComponent implements OnInit {
  public client!: Client;
  public title: string = "Detalle del cliente";
  public file?: File;
  public user?: UserDto;

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.profile().subscribe(user => {
      this.user = user;
    });

    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get("id")!;
      if(id) {
        this.clientService.show(id).subscribe(response => {
          if(response.client) {
            this.client = response.client;
          }
        });
      }
    });
  } 

  getNewClient(client: Client) {
    this.client = client;
    this.router.navigate(['/clients/show/', this.client.id])
    Swal.fire(
      'Imagen subida',
      'Imagen subida con exito',
      'success'
    )
  }
}
