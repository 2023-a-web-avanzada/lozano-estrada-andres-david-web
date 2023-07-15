'use client'

import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {FormularioEjemplo} from "@/app/i_react_hook_form/types/formulario-ejemplo";
import {Button, InputLabel, FormControl, Select, MenuItem} from "@mui/material";

export default function Page() {
    const [nombre, setNombre] = useState("Andrés");

    const {handleSubmit, register, formState: {errors, isValid},
        control
    } = useForm<FormularioEjemplo>(
        {
            defaultValues: {
                nombre: "Andrés",
                estadoCivil: ""
            },
            mode: "all"
        }
    )

    const controladorSubmit = (data: FormularioEjemplo) => {
        console.log(data)
    };

    return (
        <div className={ "container" }>
            <h1>Formulario con React Hook Form</h1>
            <form onSubmit={ handleSubmit(controladorSubmit) }>
                <div className={ "mb-3" }>
                    <label htmlFor={ "nombre" } className={ "form-label" }>Nombre</label>
                    <input type={ "text" } className={ "form-control" } placeholder={ "EJ: Andrés" } id={ "nombre" }
                        {
                            ...register("nombre", {
                                required: {
                                    value: true,
                                    message: "Nombre requerido"
                                },
                                maxLength: {value: 20, message: "Longitud máxima de 20"},
                                minLength: {value: 5, message: "Longitud mínima de 10"},
                                validate: {
                                    soloNumeros: (valorActual) => {
                                        // transformar a numero un string
                                        // number("1")
                                        // +"1"
                                        if (Number.isNaN(+valorActual)) {
                                            // Se puede devolver un false o un mensaje de error
                                            // return false; // Error
                                            return 'Ingrese solamente números'; // Error
                                        } else {
                                            // Se devuelve un true
                                            return true;    // Está correcto
                                        }
                                    }
                                }
                            })
                        }
                    />
                    <div id={ "nombreHelp" } className={ "form-text" }>
                        Ingresa tu nombre
                    </div>
                    {
                        errors.nombre &&
                        <div className={ "alert alert-warning" } role={ "alert" }>
                            Tiene errores: { errors.nombre.message }
                        </div>
                    }
                </div>

                <div className={ "mb-3" }>
                    <FormControl fullWidth>
                        <InputLabel id={ "estadoCivilLabelId" }>Estado civil</InputLabel>
                        <Controller
                            control={ control }
                            rules={{ required: { value: true, message: "Estado C. requerido" } }}
                            name={ "estadoCivil" }
                            render={ ({field: {onChange, value, onBlur,}}) => {
                                return (
                                    <>
                                        <Select
                                            labelId={"estadoCivilLabelId"}
                                            id={"estadoCivilId"}
                                            label={"Estado Civil"}
                                            onBlur={onBlur}
                                            value={value}
                                            onChange={onChange as any}
                                        >
                                            <MenuItem value={'casado'}>Casado</MenuItem>
                                            <MenuItem value={'soltero'}>Soltero</MenuItem>
                                        </Select>
                                    </>
                                )
                            }
                            }
                        />
                    </FormControl>
                </div>

                <Button
                    type={ "submit" }
                    disabled={ !isValid }
                    variant={ "outlined" }
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}