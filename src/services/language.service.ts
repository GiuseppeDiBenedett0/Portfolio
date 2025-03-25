import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export type Language = 'IT' | 'EN';

export interface SiteData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  public readonly currentLanguage = signal<Language>('IT');
  public siteData: SiteData | null = null;
  public dataLoaded = signal<boolean>(false);

  constructor() {
    this.initLanguage(); //Inizializza la lingua.
  }

  //Cambia la lingua tra italiano e inglese.
  toggleLanguage() {
    if (this.currentLanguage() === 'IT') {
      this.setLanguage('EN');
    } else {
      this.setLanguage('IT');
    }
  }

  //Imposta la lingua scelta, aggiorna i dati del sito e la memorizza nel localStorage.
  setLanguage(language: Language) {
    this.loadSiteData(language)
      .pipe(
        tap((data) => {
          this.siteData = data;
          this.setLanguageFromLocalStorage(language);
          this.updateDocumentLanguage(language);
          this.currentLanguage.set(language);
          this.dataLoaded.set(true);
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Errore nel caricamento dei dati del sito:', error);
        },
      });
  }

  //Carica i dati del sito in base alla lingua selezionata.
  loadSiteData(language: Language): Observable<SiteData> {
    const filePath =
      language === 'IT' ? '/data/italian-data.json' : '/data/english-data.json';
    return this.http.get<SiteData>(filePath);
  }

  //Recupera la lingua salvata nel localStorage, se presente.
  getLanguageFromLocalStorage(): Language {
    if (typeof window !== 'undefined' && window.localStorage) {
      return (localStorage.getItem('language') as Language) ?? 'IT';
    }
    return 'IT';
  }

  //Salva la lingua nel localStorage per mantenerla tra le sessioni.
  setLanguageFromLocalStorage(language: Language) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('language', language);
    }
  }

  //Aggiorna l'attributo lang.
  updateDocumentLanguage(language: Language) {
    this.document.documentElement.lang = language;
  }

  //Inizializza la lingua all'avvio del servizio, recuperando i dati dal localStorage.
  async initLanguage(): Promise<void> {
    const storedLanguage = this.getLanguageFromLocalStorage();
    return new Promise<void>((resolve) => {
      this.loadSiteData(storedLanguage).subscribe({
        next: (data) => {
          this.siteData = data;
          this.currentLanguage.set(storedLanguage);
          this.updateDocumentLanguage(storedLanguage);
          this.dataLoaded.set(true);
          resolve();
        },
        error: (err) => {
          console.error('Errore del caricamento dei dati:', err);
          resolve();
        },
      });
    });
  }
}
