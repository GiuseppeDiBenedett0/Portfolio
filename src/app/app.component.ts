import { Component, effect, inject, signal } from '@angular/core';
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
  isVisible: boolean = false;
  textFooter = signal<string>('');
  private readonly languageService = inject(LanguageService);
  readonly currentLanguage = signal(this.languageService.currentLanguage());
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this.currentLanguage.set(this.languageService.currentLanguage());
      if (this.languageService.dataLoaded()) {
        this.footerText();
      }
    });
  }

  //Carica la lingua salvata e i dati del sito quando il componente viene inizializzato e simula il caricamento.
  async ngOnInit(): Promise<void> {
    await this.languageService.initLanguage();
    this.isLoading = !this.languageService.dataLoaded();
    this.showSpinner = this.isLoading;
  }

  onNavigate(section: string) {
    let id = section;
    const currentLanguage = this.languageService.currentLanguage();

    switch (currentLanguage) {
      case 'IT':
        switch (section) {
          case 'Portfolio':
            id = 'Portfolio';
            break;
          case 'Chi sono':
            id = 'About';
            break;
          case 'Competenze':
            id = 'Skills';
            break;
          case 'Contatti':
            id = 'Contact';
            break;
          default:
            id = section;
            break;
        }
        break;
      default:
        //Se la lingua non è italiano, traduce 'Works' in 'Portfolio'.
        id = section === 'Works' ? 'Portfolio' : section;
        break;
    }
    this.scrollTo(id);
  }

  //Scorre la pagina verso una sezione specifica tramite il suo id.
  scrollTo(section: string) {
    const element = this.document.getElementById(section);
    if (element) {
      //Calcola la posizione dell'elemento nella pagina.
      const position = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: position - 140,
        behavior: 'smooth',
      });
    }
  }

  //Imposta il testo del footer in base alla lingua corrente.
  footerText() {
    if (
      this.languageService.dataLoaded() &&
      this.languageService.siteData?.['Footer']
    ) {
      console.log('Footer data:', this.languageService.siteData['Footer']);
      this.textFooter.set(
        this.languageService.siteData['Footer'][0]?.footerText
      );
    }
  }
}
