import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  inject,
  effect,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ThemeService } from '../services/theme.service';
import { LanguageService } from '../services/language.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  showMenuIcon: boolean = false;
  showMenu: boolean = false;
  hiddenNavbar: boolean = false;
  navLinks: any[] = [];

  private readonly maxWidthQuery = '(max-width: 991px)';

  @Output() languageChange = new EventEmitter<string>();
  @Output() navigate = new EventEmitter<string>();
  @Output() navigateHome = new EventEmitter<string>();

  readonly themeService = inject(ThemeService);
  readonly languageService = inject(LanguageService);
  private readonly document = inject(DOCUMENT);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    //Effetto reattivo quando la lingua cambia.
    effect(() => {
      this.languageService.currentLanguage();
      this.loadNavLinks(); //Aggiorna i link della navbar quando cambia lingua.
    });
  }

  async ngOnInit(): Promise<void> {
    //Inizializza la lingua all'avvio del componente.
    await this.languageService.initLanguage();

    // sserva il breakpoint per aggiornare l'icona del menu mobile.
    this.breakpointObserver
      .observe([this.maxWidthQuery])
      .subscribe(({ matches }) => {
        this.showMenuIcon = matches;
        if (!matches) {
          this.showMenu = false;
          this.hiddenNavbar = matches;
        }
      });

    //Carica i link della navbar inizialmente.
    this.loadNavLinks();
  }

  //Alterna la visibilità del menu mobile.
  showMobileMenu() {
    this.showMenu = !this.showMenu;
    this.menuScroll();
  }

  //Aggiorna lo stato del menu.
  updateMenu(menu: boolean) {
    this.showMenu = menu;
    this.menuScroll();
  }

  //Carica i link della navbar in base ai dati forniti da LanguageService.
  loadNavLinks() {
    if (this.languageService.dataLoaded()) {
      this.navLinks = this.languageService.siteData
        ? this.languageService.siteData['Navbar'] || []
        : [];
    }
  }

  menuScroll() {
    if (this.showMenu) {
      this.document.body.style.overflow = 'hidden';
    } else {
      this.document.body.style.overflow = 'auto';
    }
  }

  onNavigate(section: string) {
    this.navigate.emit(section);
  }

  navigateToHome() {
    this.navigateHome.emit('Home');
  }
}
