import { Component, inject, signal } from '@angular/core';

import {RouterOutlet } from '@angular/router';

import { Login } from "./pages/login/login";

import { Registro } from "./pages/registro/registro";

import{ AboutMe } from "./pages/about-me/about-me";

import { Home } from './pages/home/home';

import { NavBar } from './components/nav-bar/nav-bar';

import { Api } from './config/services/api';

import { FormsModule } from '@angular/forms';



@Component({

  selector: 'app-root',

  imports: [RouterOutlet,  NavBar, FormsModule],

  templateUrl: './app.html',

  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('TrabajoPractico');

  //Aca se debe conectar los servicios o la api, para que el componente pueda acceder a los datos y mostrarlos en la vista.
  api = inject(Api);

  nombre = '';
// aca llamamos al metodo que esta en el servicio, para que pueda hacer la peticion a la api y traer los datos del personaje que se busca por nombre, luego esos datos se guardan en la señal personaje, y se pueden mostrar en la vista.
// importar el formodule debido a que se necesita para el ngModel, que es lo que permite que el input se vincule con la variable nombre, para que cuando el usuario escriba algo en el input, esa información se guarde en la variable nombre, y luego se pueda usar esa variable para hacer la peticion a la api y traer los datos del personaje buscado.
  obtenerNombre() {
    this.api.getName(this.nombre);
    ;
  }

}
