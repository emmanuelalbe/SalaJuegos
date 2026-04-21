import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})

export class NavBar {

  primaryColor: string = '#4f46e5';     
  secondaryColor: string = '#06b6d4';  
  textColor: string = '#ffffff';
  hoverColor: string = '#4338ca';

  // Estilos generales
  borderRadius: string = '8px';
  padding: string = '10px 16px';
  fontSize: string = '14px';
  fontWeight: string = '500';


  // array menu para iterar en el html y generar los botones de navegación

  menu = [
    { label: 'Home', route: 'home' },
    { label: 'Login', route: 'login' },
    { label: 'Registro', route: 'registro' },
    { label: 'About Me', route: 'about-me' }
  ];

}

