import { Component } from '@angular/core';
import { fadeInAnimation } from '../page-animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInAnimation]
  })
export class HomeComponent {

  constructor(private router: Router) {}

  navigateByButton(url: string){
    this.router.navigate([url]);
  }
}
