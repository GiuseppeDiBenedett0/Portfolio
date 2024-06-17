import {
  animate,
  transition,
  trigger,
  state,
  style,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigateService } from '../navigate.service';

const hidden = { transform: 'translatex(60%)' };
const visible = { transform: 'translatex(0)' };

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style(hidden),
        animate('1s ease-in', style(visible)),
      ]),
      transition(':leave', [
        style(visible),
        animate('1s ease-in', style(hidden)),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  navBar: boolean = false;
  link!: string;

  lightMode: boolean = false;
  darkMode: boolean = true;

  constructor(
    private navigateTo: NavigateService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'dark-theme');
  }

  toggleNavBar() {
    this.navBar = !this.navBar;
  }

  navigateByNav(url: string) {
    this.navigateTo.navigate(url);
    this.link = url;
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
