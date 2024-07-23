import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.addTag({ name: 'description', content: 'Ciao, sono Giuseppe Di Benedetto, sono un junior fullstack developer. Scopri il mio portfolio, i miei progetti e come contattarmi.' });
  }
}
