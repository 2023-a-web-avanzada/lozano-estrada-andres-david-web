// f_use_context/interfaces/ContenedorContextObjeto.ts

import {Dispatch, SetStateAction} from "react";

export interface ContenedorContextObjeto {
    nombreUsuario: string;
    setNombreUsuario: Dispatch<SetStateAction<string>>
}