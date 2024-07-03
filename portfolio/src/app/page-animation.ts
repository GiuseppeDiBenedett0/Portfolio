import { trigger, state, style, transition, animate } from '@angular/animations';

//Animazione presente in ogni pagina per far apparire il contenuto con un leggero ritardo, modificando la sua opacità.
export const fadeInAnimation = trigger ('fadeIn', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter', [
        animate('2s ease-in')
    ])
]);