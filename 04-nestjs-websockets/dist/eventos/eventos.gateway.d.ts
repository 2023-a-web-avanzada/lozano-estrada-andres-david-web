import { EventosService } from "./eventos.service";
import { Socket } from 'socket.io';
export declare class EventosGateway {
    private readonly _eventosService;
    constructor(_eventosService: EventosService);
    devolverHola(message: {
        mensaje: string;
    }, socket: Socket): {
        mensaje: string;
    };
    unirseSala(message: {
        salaId: string;
        nombre: string;
    }, socket: Socket): {
        mensaje: string;
    };
    enviarMensaje(message: {
        salaId: string;
        nombre: string;
        mensaje: string;
    }, socket: Socket): {
        mensaje: string;
    };
}
