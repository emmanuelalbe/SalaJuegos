import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../config/services/auth-service';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.html',
  styleUrls: ['./mayor-menor.css'],
})
export class MayorMenor implements OnInit {

  authService = inject(AuthService);

  cartaActual: number = 0;
  cartaSiguiente: number = 0;

  puntaje: number = 0;
  vidas: number = 3;

  mensaje: string = '';
  juegoTerminado: boolean = false;

  ranking: any[] = [];

  // =========================
  ngOnInit() {
    this.iniciarJuego();
    this.cargarRanking();
  }

  // =========================
  obtenerCartaRandom(): number {
    return Math.floor(Math.random() * 13) + 1;
  }

  // =========================
  iniciarJuego() {
    this.cartaActual = this.obtenerCartaRandom();
    this.puntaje = 0;
    this.vidas = 3;
    this.juegoTerminado = false;
    this.mensaje = '';
  }

  // =========================
  jugar(eleccion: 'mayor' | 'menor') {

    if (this.juegoTerminado) return;

    this.cartaSiguiente = this.obtenerCartaRandom();

    // 🔥 evitar empate
    if (this.cartaSiguiente === this.cartaActual) {
      this.mensaje = 'Empate';
      return;
    }

    let acierto = false;

    if (eleccion === 'mayor' && this.cartaSiguiente > this.cartaActual) {
      acierto = true;
    }

    if (eleccion === 'menor' && this.cartaSiguiente < this.cartaActual) {
      acierto = true;
    }

    if (acierto) {
      this.puntaje++;
      this.mensaje = 'Correcto';
    } else {
      this.vidas--;
      this.mensaje = 'Incorrecto';
    }

    this.cartaActual = this.cartaSiguiente;

    this.verificarEstado();
  }

  // =========================
  async verificarEstado() {

    if (this.vidas <= 0) {

      this.juegoTerminado = true;
      this.mensaje = 'Fin del juego';

      await this.authService.guardarPartidaMayorMenor({
        puntaje: this.puntaje
      });

      await this.cargarRanking();
    }
  }

  // =========================
  async cargarRanking() {
    try {
      this.ranking = await this.authService.obtenerRankingMayorMenor();
    } catch (e) {
      console.error('Error ranking', e);
      this.ranking = [];
    }
  }
}