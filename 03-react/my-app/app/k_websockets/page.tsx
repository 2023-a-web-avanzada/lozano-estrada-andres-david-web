'use client'
import io from 'socket.io-client'
import {useEffect, useState} from "react";
import {MensajeChatProps, Posicion} from "@/app/k_websockets/components/types/mensaje-chat-props";
import {useForm} from "react-hook-form";
import MensajeChat from "@/app/k_websockets/components/MensajeChat";
import {FormularioModelo} from "@/app/k_websockets/components/types/formulario-modelo";

const servidorWebsocket = 'http://localhost:11202';
const socket = io(servidorWebsocket);

export default function Page() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [mensajes, setMensajes] = useState([] as MensajeChatProps[]);
    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            salaId: '',
            nombre: '',
            mensaje: '',
        },
        mode: 'all'
    })
    useEffect(
        () => {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Si está conectado');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('No está conectado');
            });
            socket.on('escucharEventoHola',(data: {mensaje: string}) => {
               console.log('escucharEventoHola', data)
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: 'Andrés',
                    posicion: Posicion.I
                };
                setMensajes((mensajesAnteriores) => [
                    ...mensajesAnteriores,
                    nuevoMensaje
                ]);
            });
            socket.on('escucharEventoUnirseSala', (data: { mensaje: string }) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: "Sistema",
                    posicion: Posicion.I
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            });
            socket.on('escucharEventoMensajeSala', (data: FormularioModelo) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.salaId + ' - ' + data.mensaje,
                    nombre: data.nombre,
                    posicion: Posicion.I
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
                console.log('escucharEventoMensajeSala');
            });
        },
        []
    )

    const estaConectado = () => {
        if (isConnected) {
            return <span>Conectado :)</span>
        } else {
            return <span>Desconectado :(</span>
        }
    }

    const unirseSalaOEnviarMensajeASala = (data: FormularioModelo) => {
        if (data.mensaje === '') {
            // unimos a la sala
            const dataEventoUnirseSala = {
                salaId: data.salaId,
                nombre: data.nombre,
            };
            socket.emit(
                'unirseSala', // Nombre Evento
                dataEventoUnirseSala,   // Datos evento
                () => {
                    const nuevoMensaje: MensajeChatProps = {
                        mensaje: 'Bienvenido a la sala ' + dataEventoUnirseSala.salaId,
                        nombre: 'Sistema',
                        posicion: Posicion.I
                    };
                    setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
                }
            );
        } else {
            // mandamos mensaje
            const dataEventoEnviarMensajeSala = {
                salaId: data.salaId,
                nombre: data.nombre,
                mensaje: data.mensaje
            };
            socket.emit(
                'enviarMensaje',    // nombre evento
                dataEventoEnviarMensajeSala,    // Datos evento
                () => {
                    const nuevoMensaje: MensajeChatProps = {
                        mensaje: data.salaId + ' - ' + data.mensaje,
                        nombre: data.nombre,
                        posicion: Posicion.D
                    };
                    setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
                }
            );
        }
    }

    const enviarEventoHola = () => {
        const mensaje = {mensaje: 'Andrés'}

        socket.emit(
            'hola', // Nombre evento
            mensaje,   // DatosEvento
            (datosEventoHola: {mensaje: string}) => {   // Callback o respuesta del evento
                console.log(datosEventoHola)    // {mensaje
                //  const [arreglo, setArreglo] = useState([1, 2])
                //  setArreglo( [1, 2, 3] )
                //  setArreglo( [1, 2] ) => [ ...[1, 2], 3 ]
                const nuevoMensaje: MensajeChatProps = {
                    ...mensaje,
                    nombre: 'Andrés',
                    posicion: Posicion.D
                };
                setMensajes(
                    (mensajesAnteriores) => [
                        ...mensajesAnteriores,
                        nuevoMensaje
                    ]
                )
            }
        )
    }

    return (
        <>
            <div>
                <h1>WebSockets</h1>
                <p><strong>{estaConectado()}</strong></p>

                <button className={'btn btn-success'} onClick={() => enviarEventoHola()}>
                    Enviar evento hola
                </button>
                <div className={'col-sm-12'}>
                    <form onSubmit={handleSubmit(unirseSalaOEnviarMensajeASala)}
                          className={'m-2 p-4 border-2 border-pink-500'}>
                        <div className={'m-2'}>
                            <label htmlFor={""}>Sala ID</label>
                            <input type={"text"}
                                   className={"form-control"}
                                   placeholder={"EJ: 1234"}
                                   id={"salaId"}
                                   {...register('salaId', {required: 'Ingresar salaId'})}
                                   aria-describedby={'salaIdHelp'}/>
                            <div id={"salaIdHelp"} className={'form-text'}>
                                Ingresa tu idSala
                            </div>
                            { errors.salaId &&
                                <div className={'alert alert-warning'}>
                                    Tiene errores {errors.salaId.message}
                                </div>
                            }
                        </div>

                        <div className={'mb-3'}>
                            <label htmlFor={'nombre'} className={'form-label'}>Nombre</label>
                            <input  type={'text'}
                                    className={'form-control'}
                                    placeholder={'Ej: Andrés'}
                                    id={'nombre'}
                                    {...register('nombre', {required: 'Nombre requierido'})}
                                    aria-describedby={'nombreHelp'}/>
                            <div id={"nombreHelp"} className={'form-text'}>
                                Ingresa tu nombre
                            </div>
                            { errors.salaId &&
                                <div className={'alert alert-warning'}>
                                    Tiene errores {errors.salaId.message}
                                </div>
                            }
                        </div>

                        <div className={'mb-3'}>
                            <label htmlFor={'mensaje'} className={'form-label'}>Mensaje</label>
                            <input  type={'text'}
                                    className={'form-control'}
                                    placeholder={'Ej: mensaje'}
                                    id={'mensaje'}
                                    {...register('mensaje')}
                                    aria-describedby={'mensajeHelp'}/>
                            <div id={"mensajeHelp"} className={'form-text'}>
                                Ingresa tu mensaje
                            </div>
                            { errors.mensaje &&
                                <div className={'alert alert-warning'}>
                                    Tiene errores {errors.mensaje.message}
                                </div>
                            }
                        </div>

                        <button type={'submit'}
                                disabled={!isValid}
                                className={'btn btn-warning'}>
                            Unirse sala
                        </button>

                        <button type={'reset'}
                                className={'btn btn-danger'}>
                            Reset
                        </button>
                    </form>
                </div>
                <div className={'row'}>
                    <div className={'col-sm-12'}>
                        <div className={'border-2 border-sky-500 p-4 m-2'}>
                            {
                                mensajes.map((mensaje, indice) =>
                                    <MensajeChat
                                        key={indice}
                                        mensaje={mensaje.mensaje}
                                        nombre={mensaje.nombre}
                                        posicion={mensaje.posicion}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
