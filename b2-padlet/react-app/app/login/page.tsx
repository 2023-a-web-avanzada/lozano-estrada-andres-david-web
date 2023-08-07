'use client'

import { Controller, useForm } from "react-hook-form";
import localFont from "next/font/local";
import { LoginProps } from "@/app/login/types/loginProps";
import { useContext, useState } from "react";
import io from "socket.io-client";
import { UserProps } from "@/app/padlet/types/userProps";
import { useRouter } from "next/navigation";
import { ContextContainer } from "@/app/context/ContextContainer";

const webSocketServer = 'http://localhost:11220';
const socket = io(webSocketServer);

const alps = localFont({ src: '../fonts/alps.woff2' });

export default function Page() {
    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        defaultValues: {
            padletId: '',
            userName: '',
            userImagePath: 'user-1.jpg'
        },
        mode: "all"
    });

    // Context
    const contextContainer = useContext(ContextContainer);
    const setPadletId = contextContainer.setPadletId;
    const setUserName = contextContainer.setUserName;
    const setUserImagePath = contextContainer.setUserImagePath;

    // Use states
    const [ selectedImage, setSelectedImage ] = useState('user-1.jpg');
    const router = useRouter();

    const handleSelectedImage = (imagePath: string) => {
        setSelectedImage(imagePath);
        setValue("userImagePath", imagePath);
    };

    // ==========   HANDLING SEND FORM EVENT   ==========
    const handleFormSubmit = (data: LoginProps) => {
        const user: UserProps = { userName: data.userName, userImagePath: data.userImagePath };

        joinPadlet({padletId: data.padletId, user});
    };

    // ==========   METHOD FOR JOINING A PADLET   ==========
    const joinPadlet = (data: { padletId: string, user: UserProps }) => {
        const joinPadletData = {
            padletId: data.padletId,
            userName: data.user.userName === '' ? 'Anónimo' : data.user.userName,
            userImagePath: data.user.userImagePath
        };

        socket.emit(
            'join-padlet',
            joinPadletData,
            () => {
                // Set context objects
                setPadletId(data.padletId);
                setUserName(data.user.userName);
                setUserImagePath(data.user.userImagePath);

                // Open the padlet of the respective room
                router.push('/padlet');
            }
        );
    };

    return (
        <>
            <div className={ 'flex w-screen h-screen bg-[#d0cfd6]' }>
                {/* LOGO */}
                <div>
                    <a className={ 'cursor-pointer absolute lg:top-12 md:top-8 sm:top-4 md:left-10 sm:left-5 ' +
                        'start-5 lg:w-52 md:w-40 sm:w-32 leading-3' }>
                        <img
                            className={ 'w-full h-full hover:hover:opacity-100 transition-opacity opacity-[0.65]' }
                            src={ '/icons/padlet.svg' }
                            alt={ 'Logo' }
                        />
                    </a>
                </div>

                {/* LOGIN */}
                <div className={ 'absolute flex items-center w-full h-full ' +
                    'justify-center text-center ' + alps.className }>
                    <div className={ 'relative rounded-2xl md:min-w-[500px] md:min-h-[500px] sm:min-h-[415px] ' +
                        'sm:min-w-[350px] border-gray-500 shadow-gray-700 border-solid shadow-2xl bg-white' }>
                        <form
                            className={ 'flex flex-col flex-1 grow px-8 md:py-12 sm:py-8 w-full h-full ' +
                            'accent-red-300 text-black' }
                            onSubmit={ handleSubmit(handleFormSubmit) }
                        >
                            {/* USER NAME */}
                            <div className={ 'justify-start' }>
                                <label className={ 'w-full mb-4 block text-justify opacity-[0.65] ' +
                                    'font-semibold md:text-xl sm:text-base' }>
                                    Nombre de Usuario (Opcional):
                                </label>
                                <input
                                    className={ 'text-black md:text-xl sm:text-base w-full py-2 px-2 ' +
                                        'rounded-lg border shadow-md border-gray-300 focus:outline-none' }
                                    type={ 'text' }
                                    id={ 'userName' }
                                    placeholder={ 'Ingresa tu nombre de usuario' }
                                    {...register('userName')}
                                />
                            </div>

                            {/* PADLET ID */}
                            <div className={ 'justify-start md:mt-5 sm:mt-3' }>
                                <label className={ 'w-full mb-4 block text-justify opacity-[0.65] ' +
                                    'font-semibold md:text-xl sm:text-base' }>
                                    Padlet ID (Obligatorio):
                                </label>
                                <input
                                    className={ 'text-black md:text-xl sm:text-base w-full py-2 px-2 ' +
                                        'rounded-lg border shadow-md focus:outline-none ' +
                                        (errors.padletId ? 'border-[#ff4081]' : 'border-gray-300') }
                                    type={ 'text' }
                                    id={ 'padletId' }
                                    placeholder={ 'Ingresa el Padlet ID' }
                                    {...register('padletId', {required: 'Padlet ID Requerido'})}
                                />
                            </div>

                            {/* USER IMAGE */}
                            <div className={ 'justify-start md:mt-5 sm:mt-3' }>
                                <label className={ 'w-full mb-4 block text-justify opacity-[0.65] ' +
                                    'font-semibold md:text-xl sm:text-base' }>
                                    Imágen de Usuario (Opcional):
                                </label>
                                <div className={ 'flex justify-start w-full' }>
                                    <Controller
                                        name={ 'userImagePath' }
                                        defaultValue={ 'user-1.jpg' }
                                        control={ control }
                                        render={ ({ field }) => (
                                            <input
                                                className={ 'hidden' }
                                                id={ 'userImagePath' }
                                                type={ 'text' }
                                                {...field}
                                            />
                                        )}
                                    />
                                    {/* IMAGE 1 */}
                                    <div className={ 'relative p-px' }>
                                        <div
                                            className={ 'absolute cursor-pointer rounded-full top-0 left-0 ' +
                                            'w-full h-full border-4 ' +
                                            (selectedImage === 'user-1.jpg' ?
                                                'border-[#f7b809]' : 'border-transparent') }
                                            onClick={ () => { handleSelectedImage('user-1.jpg') } }
                                        />
                                        <img
                                            className={ 'block rounded-full cursor-pointer md:w-12 md:h-12 ' +
                                                'sm:w-10 sm:h-10 ' }
                                            src={ '/users/user-1.jpg' }
                                            alt={ 'Usuario 1' }
                                        />
                                    </div>

                                    {/* IMAGE 2 */}
                                    <div className={ 'relative p-px md:ml-4 sm:ml-2' }>
                                        <div
                                            className={ 'absolute cursor-pointer rounded-full top-0 left-0 ' +
                                                'w-full h-full border-4 ' +
                                                (selectedImage === 'user-2.jpg' ?
                                                    'border-[#f7b809]' : 'border-transparent') }
                                            onClick={ () => { handleSelectedImage('user-2.jpg') } }
                                        />
                                        <img
                                            className={ 'block rounded-full cursor-pointer md:w-12 md:h-12 ' +
                                                'sm:w-10 sm:h-10 ' }
                                            src={ '/users/user-2.jpg' }
                                            alt={ 'Usuario 2' }
                                        />
                                    </div>

                                    {/* IMAGE 2 */}
                                    <div className={ 'relative p-px md:ml-4 sm:ml-2' }>
                                        <div
                                            className={ 'absolute cursor-pointer rounded-full top-0 left-0 ' +
                                                'w-full h-full border-4 ' +
                                                (selectedImage === 'user-3.jpg' ?
                                                    'border-[#f7b809]' : 'border-transparent') }
                                            onClick={ () => { handleSelectedImage('user-3.jpg') } }
                                        />
                                        <img
                                            className={ 'block rounded-full cursor-pointer md:w-12 md:h-12 ' +
                                                'sm:w-10 sm:h-10 ' }
                                            src={ '/users/user-3.jpg' }
                                            alt={ 'Usuario 3' }
                                        />
                                    </div>

                                    {/* IMAGE 2 */}
                                    <div className={ 'relative p-px md:ml-4 sm:ml-2' }>
                                        <div
                                            className={ 'absolute cursor-pointer rounded-full top-0 left-0 ' +
                                                'w-full h-full border-4 ' +
                                                (selectedImage === 'user-4.jpg' ?
                                                    'border-[#f7b809]' : 'border-transparent') }
                                            onClick={ () => { handleSelectedImage('user-4.jpg') } }
                                        />
                                        <img
                                            className={ 'block rounded-full cursor-pointer md:w-12 md:h-12 ' +
                                                'sm:w-10 sm:h-10 ' }
                                            src={ '/users/user-4.jpg' }
                                            alt={ 'Usuario 4' }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className={ 'md:mt-8 sm:mt-6 flex-1 items-center justify-center w-full' }>
                                <button
                                    className={ 'px-4 md:text-xl sm:text-lg bg-opacity-60 hover:bg-opacity-80 ' +
                                    'hover:font-bold min-w-[130px] min-h-[60px] bg-[#ff4081] rounded-2xl mr-4' }
                                    type={ 'reset' }
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={ 'px-4 md:text-xl sm:text-lg bg-opacity-80 hover:bg-opacity-100 ' +
                                    'hover:font-bold py-2 min-w-[130px] min-h-[60px] bg-[#f7b809] rounded-2xl' }
                                    onClick={ () => {

                                    }}
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}