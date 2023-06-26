import {useState} from "react";

export type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar?: boolean;
    color?: string;
}

export default function CComponente(
    props: PropiedadesComponente
) {
    let { url, iteraciones, mostrar, color } = props;
    const arreglo = [0, 1];
    // const numeroUno = arreglo[0];
    // const numeroDos = arreglo[1];
    const [ numeroUno, numeroDos ] = arreglo;

    const contenidoAdicional = () => {
        if (mostrar) {
            return <p>Mostrar</p>
        }
        return <p>Ocultar</p>
    }


    // useState
    const [ iteracionLocal, setIteracionLocal ] = useState(
        iteraciones
    )

    const [ colorLocal, setColorLocal ] = useState(
        color
    )

    return (
        <div className="border border-solid border-white p-3 m-2">
            <a target="_blank"
               href={url}
            >IR A URL</a>
            <p className={colorLocal}>Iteracion: {iteraciones} {iteracionLocal}</p>
            <p>Mostrar: {mostrar}</p>
            {contenidoAdicional()}
            { mostrar && <p>Mostrar rápido</p> }

            <button className="bg-blue-500" onClick={
                (event) => {
                    setIteracionLocal(iteracionLocal + 1);

                    if (colorLocal === "bg-yellow-500") {
                        setColorLocal("bg-red-500");
                    } else if (colorLocal === "bg-red-500") {
                        setColorLocal("bg-yellow-500");
                    }

                    console.log(event);
                }
            }>Aumentar</button>
        </div>
    )
}