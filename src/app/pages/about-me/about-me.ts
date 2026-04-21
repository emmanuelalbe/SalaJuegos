import { Component, inject } from '@angular/core';

import { Usergithub } from '../../config/services/usergithub';

import { OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { signal } from '@angular/core';

import { Card } from '../../components/card/card';




@Component({
  selector: 'app-about-me',
  imports: [CommonModule, Card],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
}) 
export class AboutMe implements OnInit {

  githubService = inject(Usergithub);

  usuario = signal<any | null>(null);


  ngOnInit() {

    this.githubService.obtenerUsuarioGithub().subscribe(data => {
        this.usuario.set(data);
      });
  }


}