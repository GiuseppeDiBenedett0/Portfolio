import { Component, effect, inject, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  titleData: { text: string; className: string }[] = [];

  readonly themeService = inject(ThemeService);
  readonly languageService = inject(LanguageService);

  constructor() {
    effect(() => {
      this.languageService.currentLanguage();
      this.loadTitle();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.languageService.initLanguage();
    this.loadTitle();
  }

  loadTitle() {
    if (
      this.languageService.dataLoaded() &&
      this.languageService.siteData &&
      this.languageService.siteData['Main']
    ) {
      this.titleData = [
        {
          text: this.languageService.siteData['Main'][0].title1 || '',
          className: 'first-title',
        },
        {
          text: this.languageService.siteData['Main'][1].title2 || '',
          className: 'second-title',
        },
        {
          text: this.languageService.siteData['Main'][2].title3 || '',
          className: 'third-title',
        },
        {
          text: this.languageService.siteData['Main'][3].title4 || '',
          className: 'forth-title',
        },
      ];
    }
  }
}
