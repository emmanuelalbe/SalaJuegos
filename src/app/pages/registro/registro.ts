import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

import { inject } from '@angular/core';

import { AuthService } from '../../config/services/auth-service';



@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro{

  authService = inject(AuthService);
  
formulario = new FormGroup({
  nombre: new FormControl('', {
    nonNullable: true,
    validators: [Validators.minLength(3), Validators.required]
  }),
  apellido: new FormControl('', {
    nonNullable: true,
    validators: [Validators.minLength(4), Validators.required]
  }),
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.email, Validators.required]
  }),
  edad: new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(10), Validators.max(99)]
  }),
  password: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })
});

  mostrarDatos(){

  const datos = this.formulario.getRawValue();
  
    this.authService.registrarUsuario(datos);

}


}