import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject, signal } from '@angular/core';

@Injectable({

  providedIn: 'root',
})
export class Usergithub {

  http = inject(HttpClient);
  
  apiGithub = 'https://api.github.com/users/';

  usuario:string ='emmanuelalbe';

  obtenerUsuarioGithub() {

    return this.http.get<any>(this.apiGithub + this.usuario);
  }
}
