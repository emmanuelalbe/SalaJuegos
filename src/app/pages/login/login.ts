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

  ingresar() {
    const datos = this.formulario.getRawValue();
    this.authService.login(datos);
  }
}
