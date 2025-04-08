import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavMenuComponent } from '../components/nav-menu/nav-menu.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { SkillIconComponent } from '../components/skill-icon/skill-icon.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ContactComponent } from '../contact/contact.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MainComponent } from '../main/main.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastComponent } from '../components/toast/toast.component';
import { LanguageService } from '../services/language.service';
import { ThemeService } from '../services/theme.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavMenuComponent,
    MainComponent,
    LoadingSpinnerComponent,
    AboutComponent,
    SkillsComponent,
    SkillIconComponent,
    PortfolioComponent,
    ContactComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    ThemeService,
    LanguageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
