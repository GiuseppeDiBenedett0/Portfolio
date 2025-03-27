import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, effect, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [],
})
export class AboutComponent {
  title: string = '';
  paragraph: string = '';

  readonly languageService = inject(LanguageService);

  constructor() {
    effect(() => {
      this.languageService.currentLanguage();
      this.loadParagraph();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.languageService.initLanguage();
    this.loadParagraph();
  }

  loadParagraph() {
    if (
      this.languageService.dataLoaded() &&
      this.languageService.siteData &&
      this.languageService.siteData['About']
    ) {
      this.title = this.languageService.siteData['About'][0].title || '';
      this.paragraph =
        this.languageService.siteData['About'][1].paragraph || '';
    }
  }
}
