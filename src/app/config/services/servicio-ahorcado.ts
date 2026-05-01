import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  palabras: string[] = [
    'angular',
    'javascript',
    'typescript',
    'programacion',
    'computadora',
    'desarrollo',
    'frontend',
    'backend',
    'servidor',
    'cliente',
    'internet',
    'teclado',
    'pantalla',
    'codigo',
    'variable',
    'funcion',
    'objeto',
    'array',
    'base',
    'datos',
    'framework',
    'aplicacion'
  ];

  obtenerPalabra(): string {
    const random = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[random];
  }
}