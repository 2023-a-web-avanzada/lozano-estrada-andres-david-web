'use client'

import io from 'socket.io-client';
import { useEffect, useState, useContext } from "react";
import { UserProps } from "@/app/padlet/types/userProps";
import { useRouter } from "next/navigation";
import Post from './components/post';
import localFont from "next/font/local";
import BottomMenu from "@/app/padlet/components/bottomMenu"
import AddButton from "@/app/padlet/components/addButton";
import Header from "@/app/padlet/components/header";
import Panel from "@/app/padlet/components/panel";
import NavMenu from "@/app/padlet/components/navMenu";
import { PostProps } from "@/app/padlet/types/postProps";
import { ContextContainer } from "@/app/context/ContextContainer";
import { PostForm } from "@/app/padlet/types/postForm";

const webSocketServer = 'http://localhost:11220';
const socket = io(webSocketServer);

const alps = localFont({ src: '../fonts/alps.woff2' });

export default function Page() {
    const router = useRouter();

    // Context initialization
    const contextContainer = useContext(ContextContainer);
    const padletId = contextContainer.padletId;
    const userName = contextContainer.userName;
    const userImagePath = contextContainer.userImagePath;
    const user = { userName: userName, userImagePath: userImagePath };

    // Use state posts data
    const [ connectionAllowed, setConnectionAllowed ] = useState(true);
    const [ shownPanel, setShownPanel ] = useState(false);
    const [ posts, setPosts ] = useState([] as PostProps[]);

    useEffect(() => {
            // Entering into the room when a connection is established
            if (connectionAllowed) {
                if (padletId !== '') {
                    joinPadlet({padletId, user});
                } else {
                    router.push('/login');
                }
            } else {
                // Returning to the login page when a connection is lost
                router.push('/login');
            }

            socket.on('connect', () => { setConnectionAllowed(true) });
            socket.on('disconnect', () => { setConnectionAllowed(false) });

            // Websocket event reporting that a user has entered the room **********************************************
            socket.on('user-admitted', (data: { user: UserProps }) => {
                console.log('El usuario', data.user.userName, 'se ha unido con la imagen', data.user.userImagePath);
            });

            // Websocket event reporting that a new post was added *****************************************************
            socket.on('post-added', (data: { post: PostProps }) => {
                const addedPost: PostProps = {
                    author: { userName: data.post.author.userName, userImagePath: data.post.author.userImagePath },
                    topic: data.post.topic,
                    content: data.post.content
                };

                // Adding the new post into the existen posts in the current room
                setPosts(existentPosts => [ ...existentPosts, addedPost ]);
            });
        },
        []
    );

    // ==========   METHOD FOR JOINING A PADLET   ==========
    const joinPadlet = (data: { padletId: string, user: UserProps }) => {
        socket.emit(
            'join-padlet',
            data,
            () => {
                // Getting the existen posts in the current room
                setPosts(existentPosts => [ ...existentPosts ]);
            }
        );
    };

    // ==========   METHOD FOR ADDING A POST IN A PADLET   ==========
    const addPost = (data: PostForm) => {
        const addedPost: PostProps = {
            author: { userName: userName, userImagePath: userImagePath },
            topic: data.topic,
            content: data.content
        };

        socket.emit(
            'add-post',
            { padletId: padletId, post: addedPost },
            () => {
                // Adding the new post into the existen posts in the current room
                setPosts(existentPosts => [ ...existentPosts, addedPost ]);
                console.log('POSTS:', posts);
            }
        );
    };

    return (
        <>
            <div className={ 'bg-[#d0cfd6] flex md:flex-col lg:flex-row justify-end w-screen ' +
                    'h-screen overflow-x-hidden ' + alps.className }>
                {/* MAIN CONTENT */}
                <div className={ 'flex flex-col grow w-full h-full overflow-y-auto' }>
                    {/* HEADER */}
                    <div className={ 'shrink-0 min-h-[99px] lg:min-h-[128px]' }>
                        <Header user={ user as UserProps } time={ '1d' } title={ 'Padlet: ' + padletId }/>
                    </div>

                    {/* POSTS */}
                    <div className={'flex flex-col items-center py-2 md:py-6 mx-auto w-full ' +
                            'max-w-5xl sm:px-2 md:px-6 lg:px-0'}>
                        <section className={ 'relative flex flex-col w-full' }>
                            <div className={ 'flex flex-wrap gap-2 md:gap-y-4 mt-4 mx-2 sm:mx-0' }>
                                {
                                    posts.map((postData, index) =>
                                        <Post
                                            key={ index }
                                            author={ postData.author }
                                            topic={ postData.topic }
                                            content={ postData.content }
                                        />
                                    )
                                }
                            </div>
                        </section>
                    </div>
                </div>

                {/* BOTTOM MENU */}
                <div className="block shrink-0 fixed bottom-0 lg:hidden bg-[#E3E5EA] w-full h-[52px]">
                    <BottomMenu onClick={ () => { !shownPanel ? setShownPanel(true) : '' } }/>
                </div>

                {/* NAV MENU */}
                <div className={ 'hidden lg:block bg-[#E3E5EA] shrink-0 w-18 h-full min-w-[72px]' }>
                    <NavMenu userName={ user.userName as string } userImagePath={ user.userImagePath as string }/>
                </div>

                {/* PANEL */}
                <div className={ 'absolute pointer-events-none flex items-center justify-center h-full w-full' }>
                    {
                        shownPanel ?
                            <Panel
                                onHide={ () => {
                                    setShownPanel(false);
                                }}
                                onAddPost={ (data) => {
                                    addPost(data);
                                }}
                            />
                            : ''
                    }
                </div>

                {/* ADD BUTTON */}
                <div className={ 'absolute hidden lg:visible lg:flex items-center justify-center h-full' }>
                    <AddButton onClick={ () => { !shownPanel ? setShownPanel(true) : '' } } />
                </div>
            </div>
        </>
    )
}