import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Primero, estás importando algunas cosas que necesitas para que tu servicio funcione. Estas cosas son como herramientas que te ayudarán a hacer tu trabajo.
// - `inject` es una función que te permite usar otros servicios dentro de tu servicio. Es como pedir ayuda a un amigo cuando necesitas algo.
// - `Injectable` es un decorador que le dice a Angular que este servicio puede ser inyectado en otros lugares de tu aplicación. Es como decirle a Angular: "Oye, este servicio está listo para ser usado por otros".
// - `signal` es una función que te permite crear una señal, que es una forma de almacenar datos que pueden cambiar con el tiempo. Es como tener una caja donde puedes guardar algo y luego cambiar lo que hay dentro de esa caja cuando quieras.
// - `HttpClient` es un servicio que te permite hacer peticiones HTTP, lo que significa que puedes pedir información a otras partes de internet, como una API. Es como enviar una carta a alguien para pedirle información y luego esperar su respuesta.

// Luego, usas el decorador `@Injectable` para decirle a Angular que este servicio es algo que se puede usar en toda la aplicación. Al poner `providedIn: 'root'`, le estás diciendo a Angular que este servicio estará disponible en toda la aplicación, sin importar dónde lo necesites. Es como decir: "Este servicio es para todos, así que lo voy a poner en un lugar donde todos puedan acceder a él".
// Después, dentro de la clase `Api`, estás haciendo varias cosas:

// 1. Estás usando `inject(HttpClient)` para obtener una instancia del servicio `HttpClient`. Esto te permite usar `HttpClient` para hacer peticiones HTTP. Es como pedirle a un amigo que te preste su teléfono para hacer una llamada.

// 2. Estás definiendo una variable `apiUrl` que contiene la URL de la API a la que quieres hacer la petición. Esta URL es como la dirección de una tienda a la que quieres ir para comprar algo.

// 3. Estás creando una señal llamada `personaje` que puede contener cualquier tipo de dato o ser null. Esta señal es como una caja donde puedes guardar información sobre un personaje, y puedes cambiar lo que hay dentro de esa caja cuando quieras.

// Luego, tienes un método llamado `getName` que toma un nombre como argumento. Este método es el encargado de hacer la petición a la API para obtener información sobre un personaje con ese nombre.

// Dentro de este método, haces lo siguiente:

// 1. Haces una petición HTTP usando `this.http.get<any>(this.apiUrl + name)`. Esto envía una solicitud a la API con el nombre que le pasaste, y espera una respuesta. Es como enviar una carta a la tienda con el nombre del producto que quieres comprar.

// 2. La respuesta de esta petición es un observable, lo que significa que es algo a lo que te puedes suscribir para obtener los datos cuando estén disponibles. Es como esperar a que te respondan la carta que enviaste.

// 3. Te suscribes a la petición usando `peticion.subscribe(...)`. Dentro de esta función, recibes la respuesta de la API. Si la respuesta tiene resultados y esos resultados tienen al menos un elemento, entonces guardas el primer resultado en la señal `personaje` usando `this.personaje.set(respuesta.results[0])`. Es como recibir la respuesta de la tienda y guardar el producto que te enviaron en tu caja.

// 4. Finalmente, cierras la suscripción usando `subscripcion.unsubscribe()`. Esto es importante para evitar fugas de memoria, lo que significa que si no cierras la suscripción, podrías terminar con muchas suscripciones abiertas que consumen recursos innecesariamente. Es como asegurarte de cerrar la puerta de la tienda después de entrar para no dejarla abierta y que entre gente sin control.

// En resumen, este servicio te permite hacer una petición a una API para obtener información sobre un personaje basado en su nombre, y luego guarda esa información en una señal para que puedas usarla en otras partes de tu aplicación.
@Injectable({

  providedIn: 'root',

})

export class Api {
  
http = inject(HttpClient);

apiUrl = 'https://api.attackontitanapi.com/characters?name=';

personaje = signal<any | null>(null); // por defecto es null, pero puede ser cualquier tipo de dato

  getName(name: string) {



    const peticion = this.http.get<any>(this.apiUrl + name);


    const subscripcion = peticion.subscribe((respuesta) => {

      if(respuesta.results && respuesta.results.length > 0) {
        this.personaje.set(respuesta.results[0]);
      }

      subscripcion.unsubscribe();
    });

  }

}