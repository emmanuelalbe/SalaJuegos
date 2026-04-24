import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';



@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro{
  
formulario = new FormGroup({
  nombre: new FormControl('', {
    validators: [Validators.minLength(3), Validators.required]
  }),
  apellido: new FormControl('', {
    validators: [Validators.minLength(4), Validators.required]
  }),
  mail: new FormControl('', {
    validators: [Validators.email, Validators.required]
  }),
  edad: new FormControl('', {
    validators: [Validators.required, Validators.min(10), Validators.max(99)]
  }),
  password: new FormControl('', {
    validators: [Validators.required]
  })
});

  mosrarDatos(){
    console.log(this.formulario.value);
  }





}
