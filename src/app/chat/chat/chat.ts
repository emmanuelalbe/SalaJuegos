import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { AuthService } from '../../config/services/auth-service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnDestroy {

  AuthService = inject(AuthService);
  mensajes: WritableSignal<IMensaje[]> = signal([]);


  mensaje : string = '';
  usuario: string = '';

  enviar(){
    console.log(this.mensaje, this.usuario)
    this.AuthService.enviarMensaje(this.usuario,this.mensaje);
    this.mensaje ='';
  }

  async ngOnInit(): Promise<void> {
        const data = (await this.AuthService.traerMensajesYaExistentes()) as IMensaje[];

        this.mensajes.set(data);

    this.AuthService.canal
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensajes',
        },
        (payload: RealtimePostgresChangesPayload<IMensaje>) => {
          console.log(payload);

          this.mensajes.update((valorAnterior) => {
            return [...valorAnterior, payload.new as IMensaje];
          });
        },
      )
      .subscribe();
  }

   ngOnDestroy() {
    this.AuthService.canal.unsubscribe();
  }

}

interface IMensaje {
  usuario: string;
  contenido: string;
  id: number;
  creado_en: Date;
}

