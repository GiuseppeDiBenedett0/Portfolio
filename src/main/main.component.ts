import { Component, effect, inject, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { LanguageService } from '../services/language.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [
    trigger('titleFadeAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('2000ms ease-in')]),
    ]),
    trigger('iconFadeAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('2500ms ease-in')]),
    ]),
    trigger('ImageFadeAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('5000ms ease-in')]),
    ]),
  ],
})
export class MainComponent implements OnInit {
  titleData: { text: string; className: string }[] = [];
  titleFadeState: string[] = [];
  iconFadeState: string = 'hidden';
  imageFadeState: string = 'hidden';

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
    this.titleFadeState = this.titleData.map(() => 'hidden');
    this.iconFadeState = 'hidden';
    this.imageFadeState = 'hidden';
    this.animateMainContent();
  }

  animateMainContent() {
    this.titleData.forEach((_, index) => {
      setTimeout(() => {
        this.titleFadeState[index] = 'visible';
      }, index * 500);
    });

    setTimeout(() => {
      this.iconFadeState = 'visible';
    }, this.titleData.length * 500);

    setTimeout(() => {
      this.imageFadeState = 'visible';
    }, (this.titleData.length + 1) * 500);
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
