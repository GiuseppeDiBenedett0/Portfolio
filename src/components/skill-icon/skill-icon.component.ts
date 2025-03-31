import { Component, Input } from '@angular/core';

interface SkillIcon {
  name: string;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-skill-icon',
  standalone: false,
  templateUrl: './skill-icon.component.html',
  styleUrl: './skill-icon.component.scss',
})
export class SkillIconComponent {
  @Input() skills: SkillIcon[] = [];
}
