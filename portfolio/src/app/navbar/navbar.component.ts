import { animate, transition, trigger, state, style } from '@angular/animations';
import { Component } from '@angular/core';

const hidden =  { transform: 'translatex(60%)' };
const visible = { transform: 'translatex(0)' };

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style(hidden),
        animate('1s ease-in', style(visible))
      ]),
      transition(':leave', [
        style(visible),
        animate('1s ease-in', style(hidden))
      ])
    ])
  ]
})
export class NavbarComponent {

  navBar: boolean = false;

  constructor() {}

  toggleNavBar() {
    this.navBar = !this.navBar;
  }

}
