
import { Injectable, OnInit } from '@angular/core';

import { AuthResponse, createClient, SupabaseClient, User } from '@supabase/supabase-js';

import { usuarioRegistro } from '../models/usuarioRegistro';


@Injectable({
  providedIn: 'root',
})

export class AuthService  {


  supabaseUrl = 'https://igirdobwmknqfucrsxbk.supabase.co';

  publicKey =' sb_publishable_Cc_fDA4zDKetBTDgb3Ayhw_hDK64eyR';
  
  supabase: SupabaseClient <any, 'public', 'public', any,any>;

  usuarioActual: User | null = null;

  constructor(){
      this.supabase = createClient(this.supabaseUrl,this.publicKey)
  }

  async registrarUsuario(datos:usuarioRegistro): Promise<void> { 
    const response: AuthResponse = await this.supabase?.auth.signUp({
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
      }{
        console.log(response.data);
        this.usuarioActual = response.data.user;
      }
  }

}


