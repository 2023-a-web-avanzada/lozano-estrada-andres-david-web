import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { UserProps } from "../types/userProps";
import { PostProps } from "../types/postProps";

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
    joinPadlet(
        @MessageBody()
            message: { padletId: string, user: UserProps },
        @ConnectedSocket()
            socket: Socket
    ) {
        const { padletId, user } = message;

        socket.join(padletId);  // joining user to a padlet

        socket.broadcast.to(padletId).emit( // sending a message to padlet users
            'user-admitted', // event name that will be sent to the users
            { user }  // object that will be sent
        );

        return { message: 'Un usuario se ha conectado a la sala ' + padletId }; // Callback del método
    }

    // ==========   METHOD TO ADD A POST IN A PADLET   ==========
    @SubscribeMessage('add-post')
    addPost(
        @MessageBody()
            message: { padletId: string, post: PostProps },
        @ConnectedSocket()
            socket: Socket
    ) {
        const { padletId, post } = message;

        socket.broadcast.to(padletId).emit(
            'post-added',
            { post }
        );

        return { message: 'Un nuevo post fue añadido en la sala ' + padletId };
    }
}