import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Card } from '../card/card';

@Component({
  selector: 'app-card-juegos',
  imports: [Card, CommonModule],
  templateUrl: './card-juegos.html',
  styleUrl: './card-juegos.css',
})
export class CardJuegos {
  misJuegos = [
    {
      title: 'The Legend of Zelda',
      image: 'assets/zelda.jpg',
      description: 'Una aventura épica en el reino de Hyrule.'
    },
    {
      title: 'Super Mario Odyssey',
      image: 'assets/mario.jpg',
      description: 'Un viaje de plataformas en 3D por todo el mundo.'
    },
    {
      title: 'Elden Ring',
      image: 'assets/elden.jpg',
      description: 'Un RPG de acción en un vasto mundo abierto.'
    }
  ];
}
