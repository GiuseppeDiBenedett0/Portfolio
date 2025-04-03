import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../services/language.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ThemeService } from '../services/theme.service';

interface ProjectGroup {
  title: string;
  projects: ProjectsData[];
}

interface ProjectsData {
  src: string;
  alt: string;
  projectName: string;
  web: string;
  github: string;
  hovered?: boolean;
}

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  animations: [
    trigger('showLinks', [
      state('hidden', style({ opacity: 0, transform: 'translateY(100%)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('300ms ease-out')),
      transition('visible => hidden', animate('300ms ease-in')),
    ]),
  ],
})
export class PortfolioComponent implements OnInit {
  projectGroup = signal<ProjectGroup[]>([]);

  readonly languageService = inject(LanguageService);
  readonly currentLanguage = signal(this.languageService.currentLanguage());
  readonly themeService = inject(ThemeService);

  constructor() {
    effect(() => {
      this.currentLanguage.set(this.languageService.currentLanguage());
      if (this.languageService.dataLoaded()) {
        this.loadProjects();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.languageService.initLanguage();
    this.loadProjects();
  }

  //Carica i progetti dal servizio della lingua, aggiorna lo stato del signal projectGroup e imposta hovered a false.
  private loadProjects(): void {
    if (
      this.languageService.dataLoaded() &&
      this.languageService.siteData?.['Portfolio']
    ) {
      this.projectGroup.set(
        this.languageService.siteData['Portfolio'].map((group: ProjectGroup) => ({
          ...group,
          projects: group.projects.map(project => ({
            ...project,
            hovered: false,
          })),
        }))
      );
    }
  }

  //Gestisce l'evento hover, aggiornando il suo stato hovered.
  onHover(project: ProjectsData, isHovering: boolean): void {
    project.hovered = isHovering;
    this.projectGroup.set([...this.projectGroup()]);
  }
}
