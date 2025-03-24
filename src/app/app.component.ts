import { Component, inject } from '@angular/core';
import { Theme, ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Portfolio2';
}
