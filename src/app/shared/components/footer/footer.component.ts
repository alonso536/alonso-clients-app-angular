import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
    `.footer {
      position: relative;
      bottom: 0px;
      height: 60px;
    }`
  ]
})
export class FooterComponent {
  public author: string = "Alonso Díaz"
}
