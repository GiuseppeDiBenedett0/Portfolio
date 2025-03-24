import {
  Component,
  OnInit,
  Output,
  signal,
  EventEmitter,
  inject,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ThemeService } from '../services/theme.service';

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
  navIt = signal(['Home', 'About', 'Skills', 'Portfolio', 'Contatti']);
  navEn = signal(['Home', 'About', 'Skills', 'Works', 'Contact']);
  navLinks = this.navIt();
  currentLanguage: string = 'IT';
  private readonly maxWidthQuery = '(max-width: 991px)';

  //Emette l'evento quando la lingua cambia.
  @Output() languageChange = new EventEmitter<string>();

  //Inietta il servizio per la gestione del tema.
  readonly themeService = inject(ThemeService);

  constructor(private breakpointObserver: BreakpointObserver) {}

  //Osserva le modifiche del breakpoint maxWidthQuery.
  ngOnInit(): void {
    this.breakpointObserver
      .observe([this.maxWidthQuery])
      .subscribe(({ matches }) => {
        this.showMenuIcon = matches;
        if (!matches) {
          this.showMenu = false;
          this.hiddenNavbar = matches;
        }
      });
  }

  //Cambia la lingua e aggiorna i link di navigazione.
  changeLanguage(language: string) {
    if (language === 'IT') {
      this.navLinks = this.navIt();
      this.currentLanguage = 'IT';
    } else if (language === 'EN') {
      this.navLinks = this.navEn();
      this.currentLanguage = 'EN';
    }
    this.languageChange.emit(language);
  }

  showMobileMenu() {
    this.showMenu = !this.showMenu;
  }

  updateMenu(menu: boolean) {
    this.showMenu = menu;
  }
}
