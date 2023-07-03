// EComponenteC.tsx
import React, {useContext} from "react";
import {ContenedorContext} from "@/app/f_use_context/context/ContenedorContext";

export default function EComponenteB() {
    const contenedorContexto = useContext(ContenedorContext);

    return (
        <>
            Componente C
            <p>{contenedorContexto.nombreUsuario}</p>
            <button className={"bg-blue-500 m-2"} onClick={
                e => {
                    e.preventDefault();
                    contenedorContexto.setNombreUsuario("CompC");
                }
            }>
                Actualizar
            </button>
            <br/>
        </>
    )
}