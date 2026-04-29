
import { inject, Injectable, OnInit, signal } from '@angular/core';

import { AuthResponse, createClient, SupabaseClient, User, UserResponse } from '@supabase/supabase-js';

import { usuarioRegistro } from '../../models/usuarioRegistro';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class AuthService  {


  supabaseUrl = 'https://igirdobwmknqfucrsxbk.supabase.co';

  publicKey =' sb_publishable_Cc_fDA4zDKetBTDgb3Ayhw_hDK64eyR';
  
  supabase: SupabaseClient <any, 'public', 'public', any,any>;

  usuarioActual =  signal<User | null>(null);

  router: Router;

  constructor(){
    
      this.supabase = createClient(this.supabaseUrl,this.publicKey);

      this.router = inject(Router);

      this.supabase.auth.onAuthStateChange((event,session)=>{

        const user = session?.user;

        this.usuarioActual.set(user ?? null)

        if(user){
          this.router.navigateByUrl('home')
        }else{
          this.router.navigateByUrl('registro')
        }
      })
  }

  
  async registrarUsuario(datos: usuarioRegistro): Promise<void> {
    const response: AuthResponse = await this.supabase.auth.signUp({
      email: datos.email,
      password: datos.password,
      options:{
        data: {
          nombre: datos.nombre,
          apellido: datos.apellido,
          edad: datos.edad
        }
      }
    });
      if(response.error){
        console.log(response.error.message)
        alert("Error al registrar usuario");
      }else{
        console.log(response.data);
        this.usuarioActual.set(response.data.user);
        this.router.navigate(['/home']);
      }
  }

  async login(datos:{email:string, password:string}): Promise<void> {
    const response: AuthResponse = await this.supabase?.auth.signInWithPassword({
      email: datos.email,
      password: datos.password
    });
    if(response.error){
      console.log(response.error.message)
    }{
      console.log(response.data);
      this.usuarioActual.set(response.data.user);
    }

}

  async cerrarSesion(): Promise<void> {
    this.supabase.auth.signOut();
    this.usuarioActual.set(null)
    this.router.navigate(['/login']);
    
  }
  



  
}