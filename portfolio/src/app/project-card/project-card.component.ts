import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {

  //Proprietà per ricevere i dati dei progetti dal componente genitore.
  @Input() projects: {
    title: string;
    description: string;
    projectPreview: string;
    tools: string[];
  }[] = [];
}
