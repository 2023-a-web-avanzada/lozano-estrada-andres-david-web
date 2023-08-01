import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import {UserProps} from "../types/user-props";

@WebSocketGateway(
    11220,  // websocket server listening port
    {
        cors: {
            origin: '*',    // cors policy (any IP)
        }
    }
)

export class EventsGateway {
    // ==========   METHOD TO JOIN USERS TO A PADLET   ==========
    @SubscribeMessage('join-padlet')   // method name to receive events
    admitUser(
        @MessageBody()
            message: { padletId: string, userName: string, userImagePath: string },
        @ConnectedSocket()
            socket: Socket
    ) {
        const { padletId, userName, userImagePath } = message;
        const user: UserProps = { userName: userName, userImagePath: userImagePath };

        socket.join(padletId);  // joining user to a padlet

        socket.broadcast.to(padletId).emit( // sending a message to padlet users
            'padlet-entry', // event name that will be sent to the users
            { user }  // object that will be sent
        );

        return { message: 'Un usuario se ha conectado a la sala ' + padletId };
    }
}