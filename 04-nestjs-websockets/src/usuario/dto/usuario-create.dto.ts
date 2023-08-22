import {IsIn, IsNotEmpty, IsString} from "class-validator";

export class UsuarioCreateDto {
    @IsNotEmpty()   // requerido
    @IsString()
    nombres: string

    @IsNotEmpty()   // requerido
    @IsString()
    apellidos: string

    @IsNotEmpty()   // requerido
    @IsIn(['U', 'A'])
    rol: string
}