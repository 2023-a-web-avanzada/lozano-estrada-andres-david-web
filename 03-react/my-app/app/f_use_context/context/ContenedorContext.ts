// f_use_context/context/ContenedorContext.ts
import {createContext} from "vm";
import {ContenedorContextObjeto} from "@/app/f_use_context/interfaces/ContenedorContextObjeto"

export const ContenedorContext = createContext(
    {} as ContenedorContextObjeto
)