// EContenedor.tsx
import {useEffect, useState} from "react";
import {ContenedorContextObjeto} from "@/app/f_use_context/interfaces/ContenedorContextObjeto";
import {ContenedorContext} from "@/app/f_use_context/context/ContenedorContext";
import EComponenteA from "@/app/f_use_context/components/EComponenteA";

export default function EContenedor() {
    const [nombreUsuario, setNombreUsuario] = useState("Andrés");

    const objetoContenedorContext: ContenedorContextObjeto = {
        nombreUsuario,
        setNombreUsuario
    };

    useEffect(
        () => {
            console.log('Cambio en contenedor', objetoContenedorContext.nombreUsuario);
        },
        [objetoContenedorContext.nombreUsuario]
    )

    return (
        <>
            <ContenedorContext.Provider value={objetoContenedorContext}>
                <EComponenteA></EComponenteA>
            </ContenedorContext.Provider>
        </>
    )
}