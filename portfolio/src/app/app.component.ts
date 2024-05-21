import { Component, Inject, OnInit ,Renderer2 } from '@angular/core';
import { DOCUMENT  } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'portfolio';

  lightMode: boolean = false;
  darkMode: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document, private render: Renderer2){

  }

  ngOnInit(): void {
    this.render.addClass(this.document.body, 'dark-theme');
  }

  changeTheme(theme: string){
    this.render.removeClass(this.document.body, 'light-theme');
    this.render.removeClass(this.document.body, 'dark-theme');

    if(theme === 'dark'){

      this.render.addClass(this.document.body, 'light-theme');
      this.lightMode = true;
      this.darkMode = false;

    }else if(theme === 'light'){

      this.render.addClass(this.document.body, 'dark-theme');
      this.lightMode = false;
      this.darkMode = true;

    }
  }

  
}
