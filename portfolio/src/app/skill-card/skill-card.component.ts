import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
})
export class SkillCardComponent {
  
  //Passaggio dei seguenti dati al componente genitore.
  @Input() title: string = '';
  @Input() skills: { name: string; logo: string }[] = [];
}
