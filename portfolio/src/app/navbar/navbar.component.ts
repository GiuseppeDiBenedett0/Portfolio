import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  navBar: boolean = false;
  link!: string;

  lightMode: boolean = false;
  darkMode: boolean = true;

  constructor(
    private navigateTo: NavigateService, // Servizio per la navigazione
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  //Inizializza il sito con il tema scuro.
  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'dark-theme');
  }

  //Alterna lo stato di visibilità della navbar.
  toggleNavBar() {
    this.navBar = !this.navBar;
  }

  //Chiude la navbar quando un link viene cliccato.
  closeNavBar() {
    this.navBar = false;
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      this.renderer.removeClass(navbarCollapse, 'show');
    }
  }

  //Naviga tra le pagine tramite i link presenti sulla navbar.
  navigateByNav(url: string) {
    this.navigateTo.navigate(url);
    this.link = url;
  }

  //Cambia il tema del sito tra chiaro e scuro.
  changeTheme(theme: string) {
    this.renderer.removeClass(this.document.body, 'light-theme');
    this.renderer.removeClass(this.document.body, 'dark-theme');

    if (theme === 'dark') {
      this.renderer.addClass(this.document.body, 'light-theme');
      this.lightMode = true;
      this.darkMode = false;
    } else if (theme === 'light') {
      this.renderer.addClass(this.document.body, 'dark-theme');
      this.lightMode = false;
      this.darkMode = true;
    }
  }
}
