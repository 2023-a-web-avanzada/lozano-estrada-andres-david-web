import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Socket} from 'socket.io';
import {UserProps} from "../types/userProps";
import {PostProps} from "../types/postProps";

@WebSocketGateway(
    11220,  // websocket server listening port
    {
        cors: {
            origin: '*',    // cors policy (any IP)
        }
    }
)

export class EventsGateway {
    private padlets: Record<string, { posts: PostProps[] }> = {};

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

        if (!this.padlets[padletId]) {  // create a new padlet to save posts
            this.padlets[padletId] = { posts: [] };
        }

        return this.padlets[padletId]; // method callback that is return to the emitted client
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

        this.padlets[padletId].posts.push(post);

        socket.broadcast.to(padletId).emit(
            'post-added',
            this.padlets[padletId]
        );

        return this.padlets[padletId];
    }

    // ==========   METHOD TO DELETE A POST FROM A PADLET   ==========
    @SubscribeMessage('delete-post')
    deletePost(
        @MessageBody()
            message: { padletId: string, postId: string },
        @ConnectedSocket()
            socket: Socket
    ) {
        const { padletId, postId } = message;

        this.padlets[padletId].posts = this.padlets[padletId].posts.filter(post => post.postId !== postId);

        socket.broadcast.to(padletId).emit(
            'post-deleted',
            this.padlets[padletId]
        );

        return this.padlets[padletId];
    }

    // ==========   METHOD FOR HANDLING LIKES OF A POST   ==========
    // ==========   METHOD TO DELETE A POST FROM A PADLET   ==========
    @SubscribeMessage('update-post-likes')
    updatePostLikes(
        @MessageBody()
            message: { padletId: string, postId: string, usersWhoLiked: string[] },
        @ConnectedSocket()
            socket: Socket
    ) {
        const { padletId, postId, usersWhoLiked } = message;

        const updatedPost = this.padlets[padletId].posts.find(post => post.postId === postId);
        updatedPost.usersWhoLiked = usersWhoLiked;

        socket.broadcast.to(padletId).emit(
            'post-likes-updated',
            this.padlets[padletId]
        );

        return this.padlets[padletId];
    }
}