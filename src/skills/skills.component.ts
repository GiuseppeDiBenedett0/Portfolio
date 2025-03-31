import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../services/language.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

interface SkillGroup {
  title: string;
  paragraph: string;
  icons: SkillIcons[];
}

interface SkillIcons {
  name: string;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  animations: [
    //Animazione per la visualizzazione delle icone.
    trigger('iconsMenu', [
      transition(':enter', [
        style({ maxHeight: '0', opacity: 0, overflow: 'hidden' }),
        animate('500ms ease-out', style({ maxHeight: '800px', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ maxHeight: '800px' }),
        animate(
          '500ms ease-in',
          style({ maxHeight: '0', opacity: 0, overflow: 'hidden' })
        ),
      ]),
    ]),
  ],
})
export class SkillsComponent implements OnInit {
  //Signal che contiene i gruppi di abilità caricati.
  skillGroup = signal<SkillGroup[]>([]);

  //Signal per controllare la visibilità delle icone nei vari gruppi.
  iconVisibility = signal<boolean[]>([]);

  readonly languageService = inject(LanguageService);
  readonly currentLanguage = signal(this.languageService.currentLanguage());

  constructor() {
    //Effetto che si attiva quando cambia la lingua o i dati vengono caricati.
    effect(() => {
      this.currentLanguage.set(this.languageService.currentLanguage());
      if (this.languageService.dataLoaded()) {
        this.loadSkills();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    //Inizializza la lingua prima di caricare i dati delle skills.
    await this.languageService.initLanguage();
    this.loadSkills();
  }

  //Carica i dati delle abilità dal servizio della lingua.
  private loadSkills(): void {
    if (
      this.languageService.dataLoaded() &&
      this.languageService.siteData?.['Skills']
    ) {
      this.skillGroup.set(this.languageService.siteData['Skills']);
      this.iconVisibility.set(this.skillGroup().map(() => false));
    }
  }

  //Alterna la visibilità delle icone per un determinato gruppo di skills.
  toggleIcons(index: number) {
    this.iconVisibility.update((visibility) => {
      const updatedVisibility = [...visibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  }
}
