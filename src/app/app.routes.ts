import { Routes } from '@angular/router';

import  { Home } from './pages/home/home';

import { AboutMe } from './pages/about-me/about-me'

import { Login } from './pages/login/login';

import { Registro } from './pages/registro/registro';


export const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },

  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },

  { path: 'about-me', loadComponent: () => import('./pages/about-me/about-me').then(m => m.AboutMe) },

  { path: 'registro', loadComponent: () => import('./pages/registro/registro').then(m => m.Registro) }];

