import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type TriviaQuestion = {
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type OpenTriviaResponse = {
  response_code: number;
  results: TriviaQuestion[];
};

@Injectable({ providedIn: 'root' })
export class PreguntadosService {
  private http = inject(HttpClient);
  private apiUrl = 'https://opentdb.com/api.php';

  async obtenerPreguntas(params?: {
    amount?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    category?: number;
  }): Promise<TriviaQuestion[]> {
    const amount = params?.amount ?? 10;

    let httpParams = new HttpParams().set('amount', amount).set('type', 'multiple');
    if (params?.difficulty) httpParams = httpParams.set('difficulty', params.difficulty);
    if (params?.category) httpParams = httpParams.set('category', params.category);

    const resp = await firstValueFrom(
      this.http.get<OpenTriviaResponse>(this.apiUrl, { params: httpParams })
    );

    if (!resp || resp.response_code !== 0) return [];
    return resp.results ?? [];
  }
}

