import { Component, Input, signal } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%) translateX(-50%)', opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateY(0) translateX(-50%)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateY(-100%) translateX(-50%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class ToastComponent {
  @Input() isVisible: boolean = true;
  @Input() toastTitle = '';
  @Input() toastParagraph = '';
  @Input() toastType: 'success' | 'error' = 'success';
}
