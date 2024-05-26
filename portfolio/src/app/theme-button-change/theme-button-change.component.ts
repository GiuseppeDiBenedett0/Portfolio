import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-theme-button-change',
  templateUrl: './theme-button-change.component.html',
  styleUrl: './theme-button-change.component.scss'
})
export class ThemeButtonChangeComponent implements OnInit {

  lightMode: boolean = false;
  darkMode: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'dark-theme');
  }

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
