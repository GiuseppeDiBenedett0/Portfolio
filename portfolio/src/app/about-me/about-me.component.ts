import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../page-animation';
import { HttpClient } from '@angular/common/http';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  animations: [fadeInAnimation],
})
export class AboutMeComponent implements OnInit {
  frontEndSkills: { name: string; logo: string }[] = [];
  backEndSkills: { name: string; logo: string }[] = [];
  frameworkSkills: { name: string; logo: string }[] = [];
  toolsSkills: { name: string; logo: string }[] = [];

  constructor(private http: HttpClient, private navigateTo: NavigateService) {}

  ngOnInit() {
    this.http.get<any>('assets/skill-list.json').subscribe((data) => {
      this.frontEndSkills = data.frontEndSkills;
      this.backEndSkills = data.backEndSkills;
      this.frameworkSkills = data.frameworkSkills;
      this.toolsSkills = data.toolsSkills;
    });
  }

  navigateToPortfolio(url: string) {
    this.navigateTo.navigate(url);
  }
}
