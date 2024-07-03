import { Component } from '@angular/core';
import { fadeInAnimation } from '../page-animation';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInAnimation],
})
export class HomeComponent {

  constructor(private navigateTo: NavigateService) {}

  //Funzione che serve per navigare verso la pagina "Aboute-me".
  navigateToAbout(url: string) {
    this.navigateTo.navigate(url);
  }
}
