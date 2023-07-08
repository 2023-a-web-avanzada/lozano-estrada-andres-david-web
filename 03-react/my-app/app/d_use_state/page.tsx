// d_use_state/CryptoFormulario.tsx
'use client'
import {useEffect, useState} from "react";

interface Usuario {
    nombre: string;
    edad: number;
    casado: boolean;
    hijos?: number[]
}

export default function Page() {
    const [numero, setNumero] = useState(0);
    const [arreglonumeros, setArreglonumeros] = useState([1, 2, 3] as number[]);
    const [usuario, setUsuario] = useState({
        nombre: "Andrés",
        edad: 25,
        casado: false,
    } as Usuario);

    // ayuda a escuchar cambios variables
    useEffect(
        () => {
            console.log('INICIO DEL COMPONENTE', numero, usuario);
        },
        []  // arregloVariables
        // Si está vacío se ejecuta al principio una vez
    );

    useEffect(
        () => {
            console.log('Cambio numero', numero);
        },
        [numero] // arregloVariables
    )

    useEffect(
        () => {
            console.log('Cambio arregloNumeros', arreglonumeros);
        },
        [arreglonumeros] // arregloVariables
    )

    useEffect(
        () => {
            console.log('Cambio usuario', usuario);
        },
        [usuario] // arregloVariables
    )

    return (
        <>
            <button className="bg-blue-500 m-2" onClick={(event) => {
                event.preventDefault();
                setNumero(numero + 1);
            }}>Numero {numero}</button>

            <button className="bg-blue-500 m-2" onClick={(event) => {
                event.preventDefault();
                setArreglonumeros([...arreglonumeros, 1]);
            }}>Arreglo {JSON.stringify(arreglonumeros)}</button>

            <button className="bg-blue-500 m-2" onClick={(event) => {
                event.preventDefault();
                let usuarioNuevo = {...usuario, nombre: new Date().toString()};
                setUsuario(usuarioNuevo);
            }}>Usuario {JSON.stringify(usuario)}</button>
        </>
    )
}