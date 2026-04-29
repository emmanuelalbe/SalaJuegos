import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';



export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  
  const router = inject(Router);

  const estaLogueado = !!authService.usuarioActual();

  if (!estaLogueado) {
    router.navigateByUrl('login');
    return false;
  }

  return true;
};