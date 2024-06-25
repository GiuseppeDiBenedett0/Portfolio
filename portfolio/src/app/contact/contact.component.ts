import { Component } from '@angular/core';
import { fadeInAnimation } from '../page-animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [fadeInAnimation],
})
export class ContactComponent {

}
