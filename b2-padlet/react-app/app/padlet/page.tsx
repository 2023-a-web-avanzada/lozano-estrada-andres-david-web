'use client'

import io from 'socket.io-client';
import { useEffect } from "react";
import { UserProps } from "@/app/padlet/types/user-props";

const webSocketServer = 'http://localhost:11220';
const socket = io(webSocketServer);

export default function Page() {
    useEffect(() => {
            socket.on('connect', () => {
                console.log('Se ha establecido una conexión con el servidor de websockets!');
            });

            socket.on('disconnect', () => {
                console.log('Se ha perdido la conexión con el servidor de websockets!');
            });

            socket.on('padlet-entry', (data: { user: UserProps }) => {
                console.log('El usuario', data.user.userName, 'se ha unido con la imagen', data.user.userImagePath);
            });
        },
        []
    );

    // ==========   METHOD FOR JOINING A PADLET   ==========
    const joinPadlet = (data: { padletId: string, user: UserProps }) => {
        const joinPadletData = {
            padletId: data.padletId,
            userName: data.user.userName === '' ? 'Anónimo' : data.user.userName,
            userImagePath: data.user.userImagePath !== undefined ? data.user.userImagePath : 'default.png'
        };

        socket.emit(
            'join-padlet',
            joinPadletData,
            () => {
                console.log(
                    'Has ingresado a la sala', joinPadletData.padletId, 'como el usuario', joinPadletData.userName
                );
            }
        );
    };

    const handleJoinButton = () => {
        const defaultUser: UserProps = { userName: 'Andrés Lozano', userImagePath: 'confectus.png' };
        const defaultData = { padletId: '1', user: defaultUser };

        joinPadlet(defaultData);
    };

    return (
        <>
            <button onClick={handleJoinButton}>Unirse al Padlet</button>
        </>
    )
}