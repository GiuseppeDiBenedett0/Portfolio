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
  projects: {
    title: string;
    description: string;
    projectPreview: string;
    tools: string[];
  }[] = [];

  constructor(private http: HttpClient, private navigateTo: NavigateService) {}

  ngOnInit() {
    this.http.get<any>('assets/projects.json').subscribe((data) => {
      this.projects = data.projects;
    });
  }

  navigateToContact(url: string) {
    this.navigateTo.navigate(url);
  }
}
