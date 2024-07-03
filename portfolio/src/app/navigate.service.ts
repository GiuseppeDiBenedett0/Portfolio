import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  //Servizio che gestisce la navigazione tra le pagine.
  constructor(private router: Router) {}

  //Esegue la navigazione verso l'URL specificato.
  navigate(url: string) {
    this.router.navigate([url]);
  }
}
