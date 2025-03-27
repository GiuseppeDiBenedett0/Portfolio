import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent {
  @Input() showMenuInput: boolean = false;
  @Output() showMenuOutput = new EventEmitter<boolean>();
  @Input() navLinks: any[] = [];

  readonly themeService = inject(ThemeService);

  readonly languageService = inject(LanguageService);

  //Chiude il menu e emette l'evento per aggiornare lo stato.
  closeMenu() {
    this.showMenuOutput.emit(!this.showMenuInput);
    this.showMenuInput = !this.showMenuInput;
  }
}
