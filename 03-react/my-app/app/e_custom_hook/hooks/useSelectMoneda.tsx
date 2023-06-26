// e_custom_hook/hooks/useSelectMoneda.tsx
import {Moneda} from "@/app/e_custom_hook/interfaces/moneda";
import {useState} from "react";

export default function UseSelectMoneda(
    label: string,
    opciones: Moneda[]
) {
    const [moneda, setMoneda] = useState('');

    const generarSelect = () => {
        return opciones.map(
            (moneda) => {
                return (
                    <option key={String(moneda.id)} value={String(moneda.id)} id={String(moneda.id)}>
                        {moneda.nombre}
                    </option>
                )
            }
        )
    }

    const UseSelectMonedas = (
        <>
            <label className="form-label" htmlFor={label}>{label}</label>
            <select className="form-select"
                    name={label}
                    id={label}
                    value={moneda}
                    onChange={e => {
                        e.preventDefault();
                        setMoneda(e.target.value);
                    }}
            >
                <option value="">Seleccionar una opción</option>
                {generarSelect()}
            </select>
        </>
    )

    return [moneda, UseSelectMonedas];
}