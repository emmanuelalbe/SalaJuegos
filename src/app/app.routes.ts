import { Routes } from '@angular/router';

import  { Home } from './pages/home/home';

import { AboutMe } from './pages/about-me/about-me'

import { Login } from './pages/login/login';

import { Registro } from './pages/registro/registro';

import { Preguntados } from './pages/Juegos/preguntados/preguntados';

import { Ahorcado } from './pages/Juegos/ahorcado/ahorcado';

import { MayorMenor } from './pages/Juegos/mayormenor/mayor-menor';

export const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },

  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },

  { path: 'about-me', loadComponent: () => import('./pages/about-me/about-me').then(m => m.AboutMe) },

  { path: 'registro', loadComponent: () => import('./pages/registro/registro').then(m => m.Registro) },

  { path: 'preguntados', loadComponent: () => import('./pages/Juegos/preguntados/preguntados').then(m => m.Preguntados)},

  { path: 'ahorcado', loadComponent: () => import('./pages/Juegos/ahorcado/ahorcado').then(m => m.Ahorcado) },

  { path: 'mayor-menor', loadComponent: () => import('./pages/Juegos/mayormenor/mayor-menor').then(m => m.MayorMenor) }
];

