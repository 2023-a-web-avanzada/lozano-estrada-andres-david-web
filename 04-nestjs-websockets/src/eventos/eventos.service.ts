import {Injectable} from "@nestjs/common";
import {WebSocketGateway} from "@nestjs/websockets";

@Injectable()
export class EventosService {
    saludar(): string {
        return 'Saludos';
    }
}
