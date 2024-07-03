import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../page-animation';
import { HttpClient } from '@angular/common/http';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  animations: [fadeInAnimation],
})
export class PortfolioComponent implements OnInit {

  //Creazione di array di oggetti per popolare i campi dei progetti.
  projects: {
    title: string;
    description: string;
    projectPreview: string;
    tools: string[];
  }[] = [];

  constructor(private http: HttpClient, private navigateTo: NavigateService) {}

  //Metodo per ottenere i dati dei progetti dal file JSON al momento dell'inizializzazione del componente.
  ngOnInit() {
    this.http.get<any>('assets/projects.json').subscribe((data) => {
      this.projects = data.projects;
    });
  }

  //Metodo per navigare verso la sezione contatti del sito.
  navigateToContact(url: string) {
    this.navigateTo.navigate(url);
  }
}
