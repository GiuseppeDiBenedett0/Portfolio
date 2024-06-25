import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInAnimation = trigger ('fadeIn', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter', [
        animate('2s ease-in')
    ])
]);