import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent {
  @Input() showMenuInput: boolean = false;
  @Output() showMenuOutput = new EventEmitter<boolean>();
  @Input() navLinks: string[] = [];
  @Input() currentLanguage: string = '';
  @Output() languageChange = new EventEmitter<string>();

  readonly themeService = inject(ThemeService);

  closeMenu() {
    this.showMenuInput = !this.showMenuInput;
    this.showMenuOutput.emit(this.showMenuInput);
  }

  changeLanguage(language: string) {
    this.languageChange.emit(language);
  }
}
