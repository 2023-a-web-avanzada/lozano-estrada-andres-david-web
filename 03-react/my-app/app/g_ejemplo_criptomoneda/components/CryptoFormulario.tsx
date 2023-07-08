// g_ejemplo_criptomoneda

'use client'

import {useState, useEffect} from "react";
import {MonedasConst} from "@/app/e_custom_hook/const/monedas.const";
import {Moneda} from "@/app/e_custom_hook/interfaces/moneda";
import useSelectMoneda from "@/app/e_custom_hook/hooks/useSelectMoneda";
import {ConsultaMoneda} from "@/app/g_ejemplo_criptomoneda/interfaces/consulta-moneda";

export default function CryptoFormulario(params: any) {
    const {setMonedas} = params;

    // ===== USE STATES =====

    const [monedasArreglo, setMonedasArreglo] = useState(MonedasConst);
    const [criptomonedasArreglo, setCriptomonedasArreglo] = useState([] as Moneda[]);

    const [valorMoneda, selectComendaComponente] = useSelectMoneda(
        'Seleccionar Moneda',
        monedasArreglo,
    );

    const [valorCriptoMoneda, selectCriptoMonedaComponente] = useSelectMoneda(
        'Seleccionar Criptomoneda',
        criptomonedasArreglo,
    );

    // ===== USE EFFECTS =====
    // Uso del useEffect para traer datos desde una API
    useEffect(
        () => {
            const consultarAPICripto = async () => {
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
                const respuesta = await fetch(url);
                const dataPlana = await respuesta.json();
                const arregloCriptos: Moneda[] = dataPlana.Data.map(
                    (criptoMoneda: any) => {
                        const criptoMonedaLocal: Moneda = {
                            id: criptoMoneda.CoinInfo.Name,
                            nombre: criptoMoneda.CoinInfo.FullName,
                        };
                        return criptoMonedaLocal;
                    }
                );
                setCriptomonedasArreglo(arregloCriptos);
            };
            consultarAPICripto().then().catch((error) => {
                console.error(error);
            });
        },
        [],
    );

    const manejarSubmitFormulario = (evento: any) => {
        evento.preventDefault();
        const monedasConsulta: ConsultaMoneda = {
            valorCriptoMoneda: valorCriptoMoneda as string,
            valorMoneda: valorMoneda as string,
        }
        setMonedas(monedasConsulta);
    }

    return(
        <>
            <form onSubmit={manejarSubmitFormulario}>
                {selectComendaComponente}
                {selectCriptoMonedaComponente}
                <br/>
                <button className='btn btn-primary w-100' type={"submit"}>
                    Consultar
                </button>
            </form>
        </>
    )
}