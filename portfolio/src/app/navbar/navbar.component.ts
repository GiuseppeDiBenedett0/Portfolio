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

  closeNavBar() {
    this.navBar = false;
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      this.renderer.removeClass(navbarCollapse, 'show');
    }
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
