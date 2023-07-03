// EComponenteB.tsx
import React, {useContext, useEffect} from "react";
import {ContenedorContext} from "@/app/f_use_context/context/ContenedorContext";
import EComponenteC from "@/app/f_use_context/components/EComponenteC";

export default function EComponenteB() {
    const contenedorContexto = useContext(ContenedorContext);

    return (
        <>
            Componente B
            <p>{contenedorContexto.nombreUsuario}</p>
            <button className={"bg-blue-500 m-2"} onClick={
                e => {
                    e.preventDefault();
                    contenedorContexto.setNombreUsuario("CompB");
                }
            }>
                Actualizar
            </button>
            <br/>
            <EComponenteC></EComponenteC>
        </>
    )
}