import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway,} from "@nestjs/websockets";
import {EventosService} from "./eventos.service";
import {Server, Socket} from 'socket.io';

@WebSocketGateway(
    11202,  // Puerto donde está escuchando el servidor de websockets
    {
        cors: {
            origin: '*',    // Habilitando la conexión desde cualquier IP
        }
    })

export class EventosGateway {
    constructor(private readonly _eventosService: EventosService) {
    }

    @SubscribeMessage("hola")    // Nombre del método para recibir eventos
    devolverHola(
        @MessageBody()
            message: { mensaje: string },
        @ConnectedSocket()
            socket: Socket  // import {Server, Socket} from ''socket.io';
    ) {
        console.log('message', message);
        socket.broadcast.emit(
            'escucharEventoHola',   // Nombre evento que vamos a enviar a los clientes conectados
            {   // Objeto a enviar
                mensaje: this._eventosService.saludar() + message.mensaje,
            });

        return { mensaje: 'ok' };   // Callback del método "hola"
    }

    @SubscribeMessage('unirseSala') // Nombre método "unirseSala"
    unirseSala(
        @MessageBody()
            message: { salaId: string, nombre: string },    // parámetros método
        @ConnectedSocket()
            socket: Socket
    ) {
        socket.join(message.salaId) // socket.join agrupa a los clientes de websockets
                                    // segun un identificador. Al unirse a una sala
                                    // podemos escuchar lso mensajes de esa sala.
        const mensajeDeBienvenidaSala = {
            mensaje: `Bienvenido ${message.nombre} a la sala ${message.salaId}`
        }

        socket.broadcast
            .to(message.salaId) // Manda el mensaje a un grupo en específico según el identificador
            .emit('escucharEventoUnirseSala',  // los que escuchan el evento de este grupo
                mensajeDeBienvenidaSala);       // reciben este mensaje

        return {mensaje: 'ok'}; // Callback del método 'unirseSala'
    }

    @SubscribeMessage('enviarMensaje')   // nombre dle metodo 'enviarMensaje'
    enviarMensaje(
        @MessageBody()
            message: { salaId: string, nombre: string, mensaje: string },
        @ConnectedSocket()
            socket: Socket
    ) {
        const mensajeSala = {
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId
        };

        socket.broadcast
            .to(message.salaId) // Sala a la que enviamos el mensaje
            .emit('escucharEventoMensajeSala', mensajeSala);

        return {mensaje: 'ok'};
    }
}
