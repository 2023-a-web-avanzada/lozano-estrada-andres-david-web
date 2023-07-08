'use client'

import {useEffect, useState} from "react";
import {ConsultaMoneda} from "@/app/g_ejemplo_criptomoneda/interfaces/consulta-moneda";
import CryptoFormulario from "@/app/g_ejemplo_criptomoneda/components/CryptoFormulario";

export default function Page() {
    const [monedas, setMonedas] = useState(
        {} as ConsultaMoneda
    );

    const [resultado, setResultado] = useState({} as any);

    useEffect(
        () => {
            if (Object.keys(monedas).length === 2) {
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedas.valorCriptoMoneda}&tsyms=${monedas.valorMoneda}`
                const consultarCripto = async () => {
                    const respuesta = await fetch(url);
                    const resultado = await respuesta.json();
                    setResultado(resultado.DISPLAY[monedas.valorCriptoMoneda][monedas.valorMoneda]);
                }
                consultarCripto();
            }
        },
        [monedas]
    )
    return (
        <>
            <div className="text-center">
                <h1>Cripto Exchange Calculator</h1>
                <img className={'rounded'} src={'https://media.ambito.com/p/e2e0836c4f57f5ae2890d784df8de512/adjuntos/239/imagenes/038/723/0038723804/criptomonedasjpg.jpg'} />
            </div>
            <h2>Selección</h2>
            <p>Selecciona tu moneta y criptomoneda</p>


            <div className={'row'}>
                <div className={'col-sm-6'}>
                    <CryptoFormulario setMonedas={setMonedas}></CryptoFormulario>
                </div>
                <div className={'col-sm-6'}>
                    {
                        resultado.PRICE &&
                        <div>
                            <p><strong>PRECIO:</strong>
                                {resultado.PRICE}</p>
                            <p><strong>Precio más alto del día:</strong>
                                {resultado.HIGHDAY}</p>
                            <p><strong>Precio más bajo del día:</strong>
                                {resultado.LOWDAY}</p>
                            <p><strong>Variación en las últimas 24 horas:</strong>
                                {resultado.CHANGEPCT24HOUR}</p>
                            <p><strong>Última actualización:</strong>
                                {resultado.LASTUPDATE}</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}