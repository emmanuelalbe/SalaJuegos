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
      title: 'Ahorcado',
      image: 'TrabajoPractico/src/assets/img/logo.png',
      description: 'Una aventura épica en el reino de Hyrule.'
    },
    {
      title: 'Mayor o menor',
      image: 'TrabajoPractico/src/assets/img/logo.png',
      description: 'Un viaje de plataformas en 3D por todo el mundo.'
    },
    {
      title: 'Preguntados',
      image: 'assets/img/logo.jpg',
      description: 'Un RPG de acción en un vasto mundo abierto.'
    },
    {
      title: 'Juego PROPIO',
      image: 'assets/img/logo.jpg',
      description: 'Todabia no se que juego poner, pero va a ser un juegazo'
    }
  ];
}
