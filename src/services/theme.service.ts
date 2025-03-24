import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

//Definisce il tema.
export type Theme = 'dark' | 'light'; 

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT); //Inietta il document del browser.
  public readonly currentTheme = signal<Theme>('dark'); //Crea un segnale per il tema corrente.

  constructor() {
    this.setTheme(this.getThemeFromLocalStorage()); //Imposta il tema iniziale dal localStorage.
  }

  //Inverte il tema.
  toggleTheme() {
    if (this.currentTheme() === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  //Imposta il tema corrente, aggiorna la classe del documentElement e salva nel localStorage.
  setTheme(theme: Theme) {
    
    this.currentTheme.set(theme);
    if (theme === 'dark') {
      this.document.documentElement.classList.remove('light-mode');
    } else {
      this.document.documentElement.classList.add('light-mode');
    }
    this.setThemeFromLocalStorage(theme);
  }

  //Recupera il tema dal localStorage o restituisce 'dark' come predefinito.
  getThemeFromLocalStorage(): Theme {
    if (typeof window !== 'undefined' && window.localStorage) {
      return (localStorage.getItem('theme') as Theme) ?? 'dark';
    }
    return 'dark';
  }

  //Salva il tema nel localStorage.
  setThemeFromLocalStorage(theme: Theme) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', theme);
    }
  }
}
