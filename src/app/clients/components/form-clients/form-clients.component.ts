import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { Region } from '../../interfaces/region.interface';

@Component({
  selector: 'form-clients',
  templateUrl: './form-clients.component.html',
  styles: [
  ]
})
export class FormClientsComponent implements OnInit {
  public client: Client = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    phone: 0
  };

  public regions: Region[] = [];
  public errors: string[] = [];

  @Output()
  public newTitleEmitter = new EventEmitter<string>();

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id: number = params['id'];

      if(id) {
        this.newTitleEmitter.emit('Editar cliente');
        this.clientService.show(id).subscribe(response => {
          this.client = response.client!;
        });
      }
    });

    this.clientService.regions().subscribe(regions => {
      this.regions = regions;
    });
  }

  store(): void {
    this.clientService.store(this.client).subscribe(
      response => {
        this.router.navigate(['/clients/home'])
        Swal.fire(
          'Cliente creado',
          response.msg,
          'success'
        )
      },
      err => {
        this.errors = err.errors as string[]
      }
    );
  }

  update() { 
    this.clientService.update(this.client).subscribe(
      response => {
        this.router.navigate(['/clients/home'])
        Swal.fire(
          'Cliente actualizado',
          response.msg,
          'success'
        )
      },
      err => {
        this.errors = err.errors as string[]
      }
    );
  }

  compareRegion(r1: Region, r2: Region): boolean {
    if(r1 === undefined && r2 === undefined) {
      return true;
    }
    return r1 == null || r2 == null ? false : r1.id === r2.id;
  }
}
