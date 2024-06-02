import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter',[
        animate('3s ease-in')
      ])
    ])
  ]
  })
export class HomeComponent {

  constructor(private router: Router) {}

  navigateByButton(url: string){
    this.router.navigate([url]);
  }
}
