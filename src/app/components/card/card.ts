import { Component, InputSignal, input } from '@angular/core';
@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  title = input<string>('Sin título');

  image = input<string>('sin imagen');

  description = input<string>('Sin descripción');

  
}
