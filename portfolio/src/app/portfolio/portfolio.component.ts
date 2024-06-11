import { Component } from '@angular/core';
import { fadeInAnimation } from '../page-animation';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  animations: [fadeInAnimation]
})
export class PortfolioComponent {

}
