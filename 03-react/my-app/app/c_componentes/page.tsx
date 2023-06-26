'use client'
import CComponente from "@/app/c_componentes/CComponente";

export default function () {
    return (
        <>
            <CComponente url={'https://www.google.com'} iteraciones={5} mostrar={true} color={"bg-yellow-500"} />
            <CComponente url={'https://www.bing.com'} iteraciones={10} mostrar={false} color={"bg-yellow-500"} />
        </>
    )
}