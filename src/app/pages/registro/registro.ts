import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validator } from '@angular/forms';



@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro{
  formulario = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    mail: new FormControl(''),
    edad: new FormControl(),
    password: new FormControl('')
  });

  mosrarDatos(){
    console.log(this.formulario.value);
  }




/*
  nombre = new FormControl('Ingresa tu nombre',{});
  apellido = new FormControl('Ingresa tu apellido');
  mail = new FormControl('Ingresa tu email');
  edad = new FormControl();
  password = new FormControl('Ingresa tu contraseña');

  mosrarDatos(){
    console.log(this.nombre.value);
    console.log(this.apellido.value);
    console.log(this.mail.value);
    console.log(this.edad.value);
    console.log(this.password.value);

}
*/

}
