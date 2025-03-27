import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Portfolio2';
  isLoading: boolean = true;
  showSpinner: boolean = true;
  private readonly languageService = inject(LanguageService);
  private readonly document = inject(DOCUMENT);

  //Carica la lingua salvata e i dati del sito quando il componente viene inizializzato e simula il caricamento.
  async ngOnInit(): Promise<void> {
    await this.languageService.initLanguage();
    this.isLoading = !this.languageService.dataLoaded();
    this.showSpinner = this.isLoading;
  }

  onNavigate(section: string) {
    this.scrollTo(section);
  }

  scrollTo(section: string) {
    const element = this.document.getElementById(section);
    if (element) {
      const position = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: position - 140,
        behavior: 'smooth',
      });
    }
  }
}
