import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from '../../config/services/auth-service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);

  modalAbierto = false;
  modalMensaje = '';

  accesosRapidos = [
    { label: 'Acceso rápido 1', email: 'rapido1@demo.com', password: 'Rapido123' },
    { label: 'Acceso rápido 2', email: 'rapido2@demo.com', password: 'Rapido123' },
    { label: 'Acceso rápido 3', email: 'rapido3@demo.com', password: 'Rapido123' },
  ];

  formulario = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(6), Validators.required]
    })
  });

  async ingresar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const datos = this.formulario.getRawValue();
    const result = await this.authService.login(datos);

    if (!result.ok) {
      this.abrirModal(result.error);
    }
  }

  abrirModal(mensaje: string) {
    this.modalMensaje = mensaje;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  ingresarRapido(email: string, password: string) {
    this.formulario.setValue({ email, password });
    this.formulario.markAllAsTouched();
    void this.ingresar();
  }
}
