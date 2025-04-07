import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LanguageService } from '../services/language.service';

interface ContactData {
  sectionTitle: string;
  text: string;
  nameInput: string;
  emailInput: string;
  textInput: string;
  button: string;
}

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  message: boolean = false;
  contactContent = signal<ContactData | null>(null);
  toastTitle: string = '';
  toastParagraph: string = '';
  showToast: boolean = false;
  toastType: 'success' | 'error' = 'success';

  readonly languageService = inject(LanguageService);
  readonly currentLanguage = signal(this.languageService.currentLanguage());

  constructor() {
    //Effetto che si attiva ogni volta che cambia la lingua.
    effect(() => {
      this.currentLanguage.set(this.languageService.currentLanguage());
      if (this.languageService.dataLoaded()) {
        this.contactData();
      }
    });
  }

  //Inizializza la lingua.
  async ngOnInit(): Promise<void> {
    await this.languageService.initLanguage();
    this.contactData();
  }

  //Imposta i dati della sezione Contact.
  private contactData(): void {
    if (
      this.languageService.dataLoaded() &&
      this.languageService.siteData?.['Contact']
    ) {
      this.contactContent.set(this.languageService.siteData['Contact'][0]);
    }
  }

  //Gestione  dell'invio del form.
  sendForm(form: NgForm) {
    if (form.invalid) {
      //Form non compilato correttamente.
      this.toastType = 'error';
      this.toastText(2);
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('message', form.value.message);

    fetch('https://formspree.io/f/myzenjod', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          form.resetForm();
          //Form inviato con successo.
          this.toastType = 'success';
          this.toastText(0);
        } else {
          //Errore lato server.
          this.toastType = 'error';
          this.toastText(1);
        }

        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      })
      .catch((error) => {
        //Errore di rete o server.
        this.toastType = 'error';
        this.toastText(1);
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      });
  }

  //Imposta il testo del toast.
  toastText(index: number) {
    if (
      this.languageService.dataLoaded() &&
      this.languageService.siteData?.['ToastMessage']
    ) {
      const toastMessage = this.languageService.siteData['ToastMessage'][index];
      this.toastTitle = toastMessage.title;
      this.toastParagraph = toastMessage.paragraph;
    }
  }
}
