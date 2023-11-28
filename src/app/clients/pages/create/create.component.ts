import { Component } from '@angular/core';

@Component({
  selector: 'clients-create-page',
  templateUrl: './create.component.html',
  styles: [
  ]
})
export class CreatePageComponent {
  public title: string = 'Crear Cliente';

  editTitle(newTitle: string) {
    this.title = newTitle;
  }
}
