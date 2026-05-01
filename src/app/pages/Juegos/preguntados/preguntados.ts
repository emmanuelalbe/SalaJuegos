import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../config/services/auth-service';
import { PreguntadosService, TriviaQuestion } from '../../../config/services/servicio-preguntados';

type PreguntaUI = {
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct: string;
  options: string[];
};

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css',
})
export class Preguntados implements OnInit {
  private authService = inject(AuthService);
  private preguntadosService = inject(PreguntadosService);

  cargando = false;
  error = '';

  preguntas: PreguntaUI[] = [];
  indice = 0;

  aciertos = 0;
  total = 10;

  opciones: string[] = [];
  bloqueado = false;
  opcionSeleccionada: string | null = null;

  terminado = false;
  guardando = false;

  ngOnInit() {
    void this.iniciarPartida();
  }

  get preguntaActual(): PreguntaUI | null {
    return this.preguntas[this.indice] ?? null;
  }

  async iniciarPartida() {
    this.cargando = true;
    this.error = '';
    this.terminado = false;
    this.guardando = false;

    this.aciertos = 0;
    this.indice = 0;
    this.bloqueado = false;
    this.opcionSeleccionada = null;

    const raw = await this.preguntadosService.obtenerPreguntas({ amount: this.total });
    this.preguntas = raw.map((q) => {
      const correct = this.decodeHtml(q.correct_answer);
      const incorrect = q.incorrect_answers.map((x) => this.decodeHtml(x));
      const options = this.shuffle([correct, ...incorrect]);

      return {
        category: this.decodeHtml(q.category),
        difficulty: q.difficulty,
        question: this.decodeHtml(q.question),
        correct,
        options,
      };
    });

    if (!this.preguntas.length) {
      this.error = 'No se pudieron cargar preguntas. Reintentá.';
      this.cargando = false;
      return;
    }

    this.actualizarOpciones();
    this.cargando = false;
  }

  seleccionar(opcion: string) {
    if (this.bloqueado || this.terminado) return;
    const q = this.preguntaActual;
    if (!q) return;

    this.bloqueado = true;
    this.opcionSeleccionada = opcion;

    if (opcion === q.correct) {
      this.aciertos++;
    }
  }

  async siguiente() {
    if (this.terminado) return;

    if (this.indice >= this.preguntas.length - 1) {
      await this.finalizar();
      return;
    }

    this.indice++;
    this.bloqueado = false;
    this.opcionSeleccionada = null;
    this.actualizarOpciones();
  }

  async finalizar() {
    this.terminado = true;
    this.guardando = true;
    await this.authService.guardarPartidaPreguntados({
      aciertos: this.aciertos,
      total_preguntas: this.preguntas.length
    });
    this.guardando = false;
  }

  esCorrecta(opcion: string): boolean {
    const q = this.preguntaActual;
    return !!q && opcion === q.correct;
  }

  private actualizarOpciones() {
    const q = this.preguntaActual;
    if (!q) {
      this.opciones = [];
      return;
    }

    this.opciones = q.options;
  }

  // OpenTriviaDB viene con HTML entities
  decodeHtml(texto: string): string {
    const doc = new DOMParser().parseFromString(texto, 'text/html');
    return doc.documentElement.textContent ?? texto;
  }

  private shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
