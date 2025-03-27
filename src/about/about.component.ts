import { Component, effect, inject, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnDestroy {
  title: string = '';
  paragraph: string = '';
  typedParagraph: string = '';
  //Id del timeout per gestire l'animazione.
  typingTimeoutId: ReturnType<typeof setTimeout> | null = null;

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

  //Interrompe il timeout se il componente viene distrutto per evitare perdite di memoria.
  ngOnDestroy(): void {
    if (this.typingTimeoutId !== null) {
      clearTimeout(this.typingTimeoutId);
    }
  }

  // Carica il paragrafo e avvia l'animazione di digitazione.
  loadParagraph() {
    if (
      this.languageService.dataLoaded() &&
      this.languageService.siteData &&
      this.languageService.siteData['About']
    ) {
      this.title = this.languageService.siteData['About'][0].title || '';
      this.paragraph =
        this.languageService.siteData['About'][1].paragraph || '';
      this.typedParagraph = '';

      //Interrompe l'animazione precedente se presente.
      if (this.typingTimeoutId !== null) {
        clearTimeout(this.typingTimeoutId);
        this.typingTimeoutId = null;
      }

      //Avvia l'animazione di digitazione.
      this.typeText();
    }
  }

  //Simula l'effetto di digitazione carattere per carattere.
  typeText(index: number = 0) {
    if (index < this.paragraph.length) {
      this.typedParagraph = this.paragraph.substring(0, index + 1);
      this.typingTimeoutId = setTimeout(() => this.typeText(index + 1), 10);//Imposta un timeout per aggiungere il prossimo carattere.
    } else {
      this.typingTimeoutId = null;//Resetta l'Id del timeout quando l'animazione è completa.
    }
  }
}
